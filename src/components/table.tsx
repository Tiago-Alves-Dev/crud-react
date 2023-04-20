import React from "react";
import {
  ArrowsUpDownIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { ColumnsI } from "../models/columnsTable";

export interface TableI {
  columns: Array<ColumnsI>;
  data: Array<any>;
  fcorder?: any;
  action: boolean;
  fcEdit?: any;
  fcRemove?: any;
}

const Table = ({
  columns,
  data,
  fcorder,
  action,
  fcEdit,
  fcRemove,
}: TableI) => {
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
                  onClick={fcorder}
                >
                  {item.text}
                  <ArrowsUpDownIcon className="w-5 h-5 ml-1" />
                </div>
              )}
            </th>
          ))}
          <th className={action ? "px-6 py-3" : "hidden"}>Ações</th>
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

            <td className={action ? "px-6 py-4 text-right" : "hidden"}>
              <div className="flex gap-5">
                <PencilSquareIcon
                  onClick={fcEdit}
                  className="cursor-pointer w-8 h-8 ml-1 font-medium text-blue-600 dark:text-blue-500 hover:underline"
                />
                <TrashIcon
                  onClick={fcRemove}
                  className="cursor-pointer w-8 h-8 ml-1 font-medium text-blue-600 dark:text-blue-500 hover:underline"
                />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
