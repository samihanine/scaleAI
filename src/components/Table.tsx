import React from 'react';
import type { ColumnDef } from '@tanstack/react-table';
import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { LoadingSpinner } from './LoadingSpinner';

type TableProps = {
  data: object[];
  columns: object[];
  isLoading?: boolean;
};

export const Table = ({ data, columns, isLoading }: TableProps) => {
  const col = columns as ColumnDef<object, object>[];

  const table = useReactTable({
    data,
    columns: col,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="p-2">
      <table className="min-w-full border-separate divide-y divide-primary-light rounded-lg border border-gray-300">
        <thead className="rounded-lg border-b border-gray-300 bg-primary text-white">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header, index) => (
                <th
                  key={header.id}
                  className={`${index === 0 ? 'rounded-tl-lg' : ''} ${
                    index === headerGroup.headers.length - 1 ? 'rounded-tr-lg' : ''
                  } px-6 py-3 text-left text-sm font-medium`}
                >
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="divide-y divide-primary-light">
          {!isLoading &&
            table.getRowModel().rows.map((row, index) => (
              <tr key={row.id} className={index % 2 === 0 ? '' : ''}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-6 py-4 text-sm">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
        </tbody>
        {isLoading && (
          <div className="flex h-full w-full items-center justify-center p-5">
            <LoadingSpinner />
          </div>
        )}
      </table>
    </div>
  );
};
