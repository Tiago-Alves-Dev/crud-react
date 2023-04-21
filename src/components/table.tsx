import React, { useState } from "react";
import {
  ArrowsUpDownIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { ColumnsI } from "../models/columnsTable";

export interface TableI {
  columns: Array<ColumnsI>;
  data: Array<any>;
  thOption?: any;
  tdOption?: any;
}

const Table = ({ columns, data, thOption, tdOption }: TableI) => {
  const [order, setOrder] = useState<string>("DESC");

  const sort = (colum: string) => {
    if (order === "ASC") {
      data = data.sort((a, b) => (a[colum] > b[colum] ? 1 : -1));
    } else {
      data = data.sort((a, b) => (a[colum] > b[colum] ? -1 : 1));
    }
  };

  return (
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          {columns.map((item, i) => (
            <th key={i} scope="col" className="px-6 py-3">
              {!item.sort ? (
                item.text
              ) : (
                <div
                  className="flex items-center cursor-pointer gap-3"
                  onClick={() => {
                    order == "DESC" ? setOrder("ASC") : setOrder("DESC");
                    sort(item.colum);
                  }}
                >
                  {item.text}
                  <ArrowsUpDownIcon className="w-5 h-5 ml-1" />
                </div>
              )}
            </th>
          ))}

          {thOption}
        </tr>
      </thead>
      <tbody className={data.length > 0 ? "" : "hidden"}>
        {data.map((item, i) => (
          <tr
            key={"data" + i}
            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
          >
            {columns.map((ele) => (
              <td className="px-6 py-4" key={++i}>
                {item[ele.colum]}
              </td>
            ))}

            {tdOption}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
