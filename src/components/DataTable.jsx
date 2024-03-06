import { useState } from "react";
import { useTable } from "react-table";

function DataTable({ columns, meteorites, setMeteroites }) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: meteorites });

  const [order, setOrder] = useState("asc");

  function handleOnClick(event) {
    if (event.target.innerText === "Mass (g)") {
      if (order === "asc") {
        setMeteroites(
          meteorites.toSorted((a, b) => {
            return Number(a.mass) < Number(b.mass) ? -1 : 1;
          })
        );
        setOrder("desc");
      } else {
        setMeteroites(
          meteorites.toSorted((a, b) => {
            return Number(a.mass) > Number(b.mass) ? -1 : 1;
          })
        );
        setOrder("asc");
      }
    }
  }
  return (
    <div className="encloseTable">
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => {
                let className = "";
                if (column.id === "mass") {
                  className = "clickAbleTableHeader";
                }
                return (
                  <th
                    className={className}
                    onClick={(event) => {
                      handleOnClick(event);
                    }}
                    {...column.getHeaderProps()}
                  >
                    {column.render("Header")}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;
