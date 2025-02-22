import React from "react";
import "./dataTable.scss";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";

const DataTable = ({ data, columns }) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <div className="dataTable">
      {data && data.length > 0 && (
        <div className="dataTable_body">
          <table>
            <thead>
              {table.getHeaderGroups().map((headerGroup, index) => (
                <tr key={`${headerGroup.id}-${index}`}>
                  {headerGroup.headers.map((header, columnIndex) => (
                    <th key={`${header.id}-${columnIndex}`}>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                        `${header.id}-${columnIndex}` // Ensuring uniqueness
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>

            <tbody>
              {table.getRowModel().rows.map((row, rowIndex) => (
                <tr key={`${row.id}-${rowIndex}`}>
                  {row.getVisibleCells().map((cell, cellIndex) => (
                    <td key={`${cell.id}-${cellIndex}`}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                        `${cell.id}-${cellIndex}` // Ensuring uniqueness
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DataTable;
