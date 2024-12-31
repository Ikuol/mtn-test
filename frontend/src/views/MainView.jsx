import React, { useState } from "react";

import { useFetchData } from "@/hooks/fetchData";

import { applyFilter, getUniqueValues } from "@/utils";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/custom/Loader/Loader";
import { MyTable } from "@/components/custom/table/MyTable";

import { columns } from "@/constants";

export const MainView = () => {
  const [actifFilter, setActifFilter] = useState("");
  const [language, setLanguage] = useState("");
  const [page, setPage] = useState(1);

  const {
    data: ghData,
    isPending,
    isError,
    isPlaceholderData,
    error,
  } = useFetchData(
    `/search/repositories?q=created:>2024-11-30&sort=stars&order=desc&per_page=10&page=${page}`,
    "ghData",
    page
  );

  if (isError) {
    return <div>Erreur de chargement : {error.message}</div>;
  }

  if (isPending) {
    return (
      <div className="flex items-center justify-center my-auto h-full">
        <Loader />
      </div>
    );
  }

  const fetchMoreData = () => {
    if (!isPlaceholderData && ghData?.total_count > ghData?.items.length) {
      setPage((old) => old + 1);
    }
  };

  const filteredData = language
    ? ghData?.items.filter(
        (repo) => repo.language?.toLowerCase() === language.toLowerCase()
      )
    : ghData?.items;

  return (
    <div className="space-y-4 w-full">
      <div className="flex justify-between items-end">
        <p className="font-semibold text-brand-hover">Liste des dépôts</p>
        <div className="flex items-center gap-x-3">
          <Input
            placeholder="Rechercher par nom ou description..."
            value={actifFilter}
            onChange={(e) => setActifFilter(e.target.value)}
            className="w-[22rem]"
          />

          <Sheet>
            <SheetTrigger asChild>
              <Button className="">Filtrer</Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle className="text-brand-hover">
                  Ajouter un filtre
                </SheetTitle>
                <SheetDescription>
                  Filtrer les données du tableau suivant les langages de
                  programmation
                </SheetDescription>
              </SheetHeader>
              <div className="mt-4">
                <Select
                  value={language}
                  onValueChange={(value) => setLanguage(value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un langage" />
                  </SelectTrigger>
                  <SelectContent>
                    {getUniqueValues(ghData?.items, "language").map((value) => (
                      <SelectItem key={value} value={value}>
                        {value}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <SheetFooter className="mt-3">
                <SheetClose asChild>
                  <Button onClick={() => setLanguage("")} type="button">
                    Réinitialiser
                  </Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <MyTable
        columns={columns}
        data={filteredData}
        filterValue={actifFilter}
        searchableColumns={["name", "description"]}
        emptyTable={"Aucune donnée pour le moment"}
        displayPagination={true}
      />

      <div className="flex justify-end space-x-2 pr-16 pb-4">
        <Button
          onClick={() => setPage((old) => Math.max(old - 1, 0))}
          className="text-xs"
          disabled={page === 1}
        >
          Précédent
        </Button>
        <Button
          className="text-xs"
          onClick={() => {
            fetchMoreData();
          }}
          disabled={isPlaceholderData}
        >
          Suivant
        </Button>
      </div>
    </div>
  );
};
