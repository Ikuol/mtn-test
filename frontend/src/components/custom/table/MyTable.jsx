import { React, useState } from "react";
import PropTypes from "prop-types";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

export const MyTable = ({
  columns,
  data,
  filterValue,
  searchableColumns = [],
  emptyTable,
  displayPagination = false,
}) => {
  const [{ pageIndex, pageSize }, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const pagination = {
    pageIndex,
    pageSize,
  };

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter: filterValue,
      pagination,
    },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    globalFilterFn: (row) => {
      const searchValue = filterValue?.toLowerCase() || "";
      return searchableColumns.some((columnKey) => {
        const value = row.original[columnKey];
        if (typeof value === "string") {
          return value.toLowerCase().includes(searchValue);
        }
        return false;
      });
    },
  });

  const currentPage = table.getState().pagination.pageIndex + 1;
  const totalElements = data.length;

  // Calcul précis du nombre d'éléments actuels
  const currentElements = Math.min(currentPage * pageSize, totalElements);

  return (
    <div className="w-full px-16">
      <Table className="rounded-md shadow-md border min-w-full w-max mt-4">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder ? null : (
                    <div
                      className={`cursor-pointer flex items-center`}
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {{
                        asc: " 🔼",
                        desc: " 🔽",
                      }[header.column.getIsSorted()] ?? null}
                    </div>
                  )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                className="cursor-pointer"
                onClick={() =>
                  navigate(getRedirectedUrl(location, row.original.symbol))
                }
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns?.length} className="h-24 text-center">
                {emptyTable}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <div
        className={`flex flex-col sm:flex-row sm:items-center sm:justify-between py-6 ${
          displayPagination ? "" : "hidden"
        } `}
      >
        <div className="text-sm text-center sm:text-left">
          {currentElements} élément(s) sur {totalElements}
        </div>
      </div>
    </div>
  );
};

MyTable.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  filterValue: PropTypes.string,
  searchableColumns: PropTypes.arrayOf(PropTypes.string),
  emptyTable: PropTypes.node,
  displayPagination: PropTypes.bool,
};
