from django.shortcuts import render

# Create your views here.
# api/views.py

from drf_yasg.utils import swagger_auto_schema
from rest_framework.decorators import api_view
from drf_yasg import openapi
from django.http import JsonResponse
from django.core.cache import cache
import requests
import datetime


def fetch_repositories(page=1, per_page=30):
    today = datetime.date.today()
    last_month = today - datetime.timedelta(days=30)
    cache_key = f"repositories_{last_month}_page{page}_perpage{per_page}"

    cached_data = cache.get(cache_key)
    if cached_data:
        return cached_data["repos"], cached_data["total_count"], None

    url = f"https://api.github.com/search/repositories?q=created:>{last_month}&sort=stars&order=desc&page={page}&per_page={per_page}"
    response = requests.get(url)

    if response.status_code != 200:
        return None, None, {"status": "error", "message": "Erreur de récupération des données depuis GitHub", "status_code": response.status_code}

    json_response = response.json()
    repos = json_response.get('items', [])
    total_count = json_response.get('total_count', 0)

    for i, repo in enumerate(repos, start=1):
        repo["id"] = i + (page - 1) * per_page

    cache.set(cache_key, {"repos": repos,
              "total_count": total_count}, timeout=300)

    return repos, total_count, None


@swagger_auto_schema(
    method='get',
    operation_description="Récupération des dépôts depuis l'api de GitHub",
    manual_parameters=[
        openapi.Parameter(
            'page', openapi.IN_QUERY, description="Le nombre de page", type=openapi.TYPE_INTEGER
        ),
        openapi.Parameter(
            'per_page', openapi.IN_QUERY, description="Le nombre de données à récupérer en fonction de la page", type=openapi.TYPE_INTEGER
        ),
    ],
    responses={200: openapi.Response(
        description="Liste des dépôts datant des 30 derniers jours")},
)
@api_view(['GET'])
def get_repositories(request):
    page = int(request.GET.get('page', 1))
    per_page = int(request.GET.get('per_page', 30))

    repos, total_count, error = fetch_repositories(
        page=page, per_page=per_page)
    if error:
        return JsonResponse(error, status=error["status_code"])

    fetched_at = datetime.datetime.now().isoformat()
    data = [
        {
            "id": repo["id"],
            "name": repo["name"],
            "description": repo["description"],
            "language": repo["language"],
            "stars": repo["stargazers_count"]
        }
        for repo in repos
    ]

    return JsonResponse({
        "status": "success",
        "fetchedAt": fetched_at,
        "total_count": total_count,
        "current_page": page,
        "per_page": per_page,
        "data": data
    }, safe=False)


@swagger_auto_schema(
    method='get',
    operation_description="Récupération des langages de programmation depuis les dépôts GitHub",
    responses={200: openapi.Response(
        description="Liste des langages de programmation")},
)
@api_view(['GET'])
def get_languages(request):
    page = int(request.GET.get('page', 1))
    per_page = int(request.GET.get('per_page', 30))

    repos, total_count, error = fetch_repositories(
        page=page, per_page=per_page)
    if error:
        return JsonResponse(error, status=error["status_code"])

    fetched_at = datetime.datetime.now().isoformat()
    languages = {repo["language"]
                 for repo in repos if repo["language"] is not None}

    return JsonResponse({
        "status": "success",
        "fetchedAt": fetched_at,
        "total_count": total_count,
        "current_page": page,
        "per_page": per_page,
        "data": list(languages)
    }, safe=False)
