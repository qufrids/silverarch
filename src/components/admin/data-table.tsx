"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";

interface Column<T> {
  key: string;
  label: string;
  render?: (item: T) => React.ReactNode;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  searchField?: string;
  pageSize?: number;
  onRowClick?: (item: T) => void;
  actions?: (item: T) => React.ReactNode;
}

export function DataTable<T extends Record<string, unknown>>({
  columns,
  data,
  searchField,
  pageSize = 10,
  onRowClick,
  actions,
}: DataTableProps<T>) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);

  const filtered = searchField
    ? data.filter((item) =>
        String(item[searchField])
          .toLowerCase()
          .includes(search.toLowerCase())
      )
    : data;

  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginated = filtered.slice(page * pageSize, (page + 1) * pageSize);

  return (
    <div>
      {searchField && (
        <div className="relative mb-4 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <Input
            placeholder="Search..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(0);
            }}
            className="border-[#1f1f25] bg-[#0b0b0f] pl-9"
          />
        </div>
      )}

      <div className="rounded-xl border border-[#1f1f25] bg-[#111116]">
        <Table>
          <TableHeader>
            <TableRow className="border-[#1f1f25] hover:bg-transparent">
              {columns.map((col) => (
                <TableHead
                  key={col.key}
                  className="text-xs font-medium uppercase tracking-wider text-gray-500"
                >
                  {col.label}
                </TableHead>
              ))}
              {actions && (
                <TableHead className="text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                  Actions
                </TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginated.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length + (actions ? 1 : 0)}
                  className="py-8 text-center text-gray-500"
                >
                  No data found.
                </TableCell>
              </TableRow>
            ) : (
              paginated.map((item, i) => (
                <TableRow
                  key={i}
                  className="cursor-pointer border-[#1f1f25] hover:bg-[#1a1a22]"
                  onClick={() => onRowClick?.(item)}
                >
                  {columns.map((col) => (
                    <TableCell key={col.key} className="text-gray-300">
                      {col.render
                        ? col.render(item)
                        : String(item[col.key] ?? "")}
                    </TableCell>
                  ))}
                  {actions && (
                    <TableCell className="text-right">
                      <div onClick={(e) => e.stopPropagation()}>
                        {actions(item)}
                      </div>
                    </TableCell>
                  )}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <div className="mt-4 flex items-center justify-between">
          <p className="text-sm text-gray-500">
            Showing {page * pageSize + 1}–
            {Math.min((page + 1) * pageSize, filtered.length)} of{" "}
            {filtered.length}
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage(page - 1)}
              disabled={page === 0}
              className="border-[#1f1f25] bg-[#111116]"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage(page + 1)}
              disabled={page >= totalPages - 1}
              className="border-[#1f1f25] bg-[#111116]"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
