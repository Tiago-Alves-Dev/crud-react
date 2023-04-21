import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import HeaderApp from "../../../components/header";
import Table from "../../../components/table";
import { ClientI } from "../../../models/client";
import { ColumnsI } from "../../../models/columnsTable";
import { GetAllClientActives } from "../../../services/service-client";
import moment from "moment";

export default function ReportSalesByClient() {
  const [data, setData] = useState<any>([]);
  const columns: Array<ColumnsI> = [
    { text: "Nome", sort: true, colum: "des_nome" },
    {
      text: "Valor acumulado de vendas",
      sort: true,
      colum: "val_venda_acumulado",
    },
    { text: "Dt do último pedido", sort: true, colum: "dta_ult_pedido" },
  ];

  const getall = () => {
    GetAllClientActives()
      .then((res: [ClientI]) => {
        res.map((client) => {
          client.dta_ult_pedido
            ? (client.dta_ult_pedido = moment(client.dta_ult_pedido).format(
                "DD/MM/YYYY"
              ))
            : (client.dta_ult_pedido = client.dta_ult_pedido);
        });
        setData(res);
      })
      .catch((err) => {
        toast.warn(
          err.response?.data.message ? err.response.data.message : err.message
        );
      });
  };

  useEffect(() => {
    getall();
  }, []);

  return (
    <>
      <HeaderApp />
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 relative overflow-x-auto mt-5">
        <h1 className="rounded-md  py-2 text-lg font-medium underline">
          Relatório
        </h1>
        <h4 className="rounded-md py-2 text-sm font-medium">
          Relatório de Vendas por Cliente
        </h4>

        <Table columns={columns} data={data} />
      </div>
    </>
  );
}
