from django.shortcuts import render

# Create your views here.
# api/views.py

from django.http import JsonResponse
import requests
import datetime


def get_repositories(request):
    today = datetime.date.today()
    last_month = today - datetime.timedelta(days=30)
    url = f"https://api.github.com/search/repositories?q=created:>{last_month}&sort=stars&order=desc&per_page=100"
    response = requests.get(url)

    if response.status_code != 200:
        return JsonResponse({"error": "Failed to fetch data from GitHub"}, status=response.status_code)

    repos = response.json().get('items', [])
    result = [
        {
            "name": repo["name"],
            "description": repo["description"],
            "language": repo["language"],
            "stars": repo["stargazers_count"]
        }
        for repo in repos
    ]
    return JsonResponse(result, safe=False)


def get_languages(request):
    # Vous pouvez stocker les données récupérées et analyser les langages ici.
    return JsonResponse({"message": "À implémenter"})
