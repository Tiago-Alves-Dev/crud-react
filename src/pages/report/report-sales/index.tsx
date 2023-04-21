import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import HeaderApp from "../../../components/header";
import Table from "../../../components/table";
import { SalesI } from "../../../models/sales";
import { GetAllSales } from "../../../services/service-sales";
import { ColumnsI } from "../../../models/columnsTable";
import moment from "moment";
import Button from "../../../components/button";
import Datepicker from "react-tailwindcss-datepicker";

export interface QueryI {
  startDate: string;
  endDate: string;
}

export default function ReportSales() {
  const [data, setData] = useState<any>([]);
  const [sales, setSales] = useState<SalesI>({} as SalesI);
  const [showModalItem, setShowModalItem] = useState(false);
  const [value, setValue] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });

  const columns: Array<ColumnsI> = [
    { text: "Código da Venda", sort: true, colum: "cod_venda" },
    { text: "Dt da Venda", sort: true, colum: "dta_venda" },
    { text: "Valor total da Venda", sort: true, colum: "val_total_venda" },
    { text: "Cd do Cliente", sort: false, colum: "client.cod_cliente" },
    { text: "Nome", sort: false, colum: "client.des_nome" },
    { text: "Cidade", sort: true, colum: "client.des_cidade" },
    { text: "UF", sort: true, colum: "client.des_uf" },
    { text: "Telefone", sort: true, colum: "client.des_telefone" },
  ];

  const columnsItem: Array<ColumnsI> = [
    { text: "Código do Item", sort: false, colum: "cod_venda" },
    { text: "Nome do Produto", sort: true, colum: "des_produto" },
    { text: "Valor Unitário", sort: false, colum: "val_unitario" },
    { text: "Quantidade", sort: false, colum: "qtd_itens" },
    { text: "Valor Total", sort: true, colum: "val_total" },
  ];

  const getall = (filter?: QueryI) => {
    GetAllSales(filter)
      .then((res: [SalesI]) => setData(res))
      .catch((err) => {
        toast.warn(
          err.response?.data.message ? err.response.data.message : err.message
        );
      });
  };

  useEffect(() => {
    getall();
  }, []);

  const saleSelected = (item: SalesI) => {
    if (item.itens != undefined) {
      item.itens.map((item) => {
        item.val_total = "R$" + formatReal(item.val_total);
        item.val_unitario = "R$" + formatReal(item.val_unitario);
      });
    }
    setSales(item);
    setShowModalItem(true);
  };

  const formatReal = (int: number) => {
    var tmp = int + "";
    tmp = tmp.replace(/([0-9]{2})$/g, ",$1");
    if (tmp.length > 6) tmp = tmp.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");

    return tmp;
  };

  const handleValueChange = (newValue: any) => {
    setValue(newValue);
    getall(newValue);
  };

  return (
    <>
      <HeaderApp />
      <div>
        <h4 className="rounded-md py-2 text-sm font-medium text-center mt-5">
          Filtrar por data da venda
        </h4>
        <div className="flex justify-center">
          <div className="w-72">
            <Datepicker value={value} onChange={handleValueChange} />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 relative overflow-x-auto">
        <h1 className="rounded-md  py-2 text-lg font-medium underline">
          Relatório
        </h1>
        <h4 className="rounded-md py-2 text-sm font-medium">
          Relatório de Vendas
        </h4>

        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              {columns.map((item, i) => (
                <th key={i} scope="col" className="px-6 py-3">
                  {item.text}
                </th>
              ))}
              <th>Item</th>
            </tr>
          </thead>
          <tbody className={data.length > 0 ? "" : "hidden"}>
            {data.map((item: SalesI, i: number) => (
              <tr
                key={"data" + i}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <td className="px-6 py-4 text-sm" key={++i}>
                  {item.cod_venda}
                </td>
                <td className="px-6 py-4 text-sm" key={++i}>
                  {item.dta_venda
                    ? moment(item.dta_venda).format("DD/MM/YYYY")
                    : item.dta_venda}
                </td>
                <td className="px-6 py-4 text-sm" key={++i}>
                  {item.val_total_venda}
                </td>
                <td className="px-6 py-4 text-sm" key={++i}>
                  {item.client?.cod_cliente}
                </td>
                <td className="px-6 py-4 text-sm" key={++i}>
                  {item.client?.des_nome}
                </td>
                <td className="px-6 py-4 text-sm" key={++i}>
                  {item.client?.des_cidade}
                </td>
                <td className="px-6 py-4 text-sm" key={++i}>
                  {item.client?.des_uf}
                </td>
                <td className="px-6 py-4 text-sm" key={++i}>
                  {item.client?.des_telefone}
                </td>
                <td className="py-6 pr-6" key={++i}>
                  {item?.itens != undefined ? (
                    <div className="text-sm" onClick={() => saleSelected(item)}>
                      <span className="font-medium text-indigo-600 hover:text-indigo-500 underline cursor-pointer">
                        Item
                      </span>
                    </div>
                  ) : (
                    <span font-medium>Sem item</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL  */}

      {showModalItem ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-4xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Itens da venda</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModalItem(false)}
                  >
                    <span className="bg-transparent text-black opacity-60 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 relative overflow-x-auto mt-5">
                  {sales?.itens && (
                    <Table columns={columnsItem} data={sales?.itens} />
                  )}
                </div>
                {/*footer*/}
                <div className="text-right p-6 border-t border-solid border-slate-200 rounded-b">
                  <Button
                    text="Fechar"
                    type="button"
                    load={false}
                    onClick={() => setShowModalItem(false)}
                    classButoon="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
