import React, { useState, useEffect } from "react";
import HeaderApp from "../../components/header";
import { ColumnsI } from "../../models/columnsTable";
import {
  CreateClient,
  DeleteClient,
  GetAllClient,
  UpdateClient,
} from "../../services/service-client";
import { ClientI } from "../../models/client";
import { toast } from "react-toastify";
import moment from "moment";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/20/solid";
import InputMask from "react-input-mask";
import CurrencyInput from "react-currency-input-field";
import Button from "../../components/button";

export default function Client() {
  const [showModalUpOrCreate, setShowModalUpOrCreate] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [data, setData] = useState<any>([]);
  const [client, setClient] = useState<ClientI>({} as ClientI);
  const [titleModal, setTitleModal] = useState<string>();
  const [load, setLoad] = useState<boolean>(false);

  const columns: Array<ColumnsI> = [
    { text: "Nome", sort: false, colum: "des_nome" },
    { text: "Contato", sort: false, colum: "des_contato" },
    { text: "Dt do último pedido", sort: false, colum: "dta_ult_pedido" },
    { text: "Dt de criação", sort: false, colum: "createdAt" },
    { text: "Status", sort: false, colum: "flg_inativo" },
  ];

  const getall = () => {
    GetAllClient()
      .then((res: [ClientI]) => {
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

  const creatAndUpdateClient = (event: any) => {
    event.preventDefault();

    if (!client.cod_cliente) {
      setLoad(true);
      CreateClient(client)
        .then(() => {
          toast.success("Sucesso! Cliente cadastrado com sucesso");
          setLoad(false);
          setShowModalUpOrCreate(false);
          getall();
        })
        .catch((err) => {
          toast.warn(
            err.response?.data.message ? err.response.data.message : err.message
          );
          setLoad(false);
        });
    } else {
      UpdateClient(client)
        .then(() => {
          toast.success("Sucesso! Cliente alterado com sucesso");
          setLoad(false);
          setShowModalUpOrCreate(false);
          getall();
        })
        .catch((err) => {
          toast.warn(
            err.response?.data.message ? err.response.data.message : err.message
          );
          setLoad(false);
        });
    }
  };

  const deleteClient = () => {
    setLoad(true);
    DeleteClient(client.cod_cliente)
      .then(() => {
        toast.success("Sucesso! Cliente removido com sucesso");
        setLoad(false);
        getall();
      })
      .catch((err) => {
        toast.warn(
          err.response?.data.message ? err.response.data.message : err.message
        );
        setLoad(false);
      });

    setShowModalDelete(false);
  };

  return (
    <>
      <HeaderApp />
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 relative overflow-x-auto mt-5">
        <h1 className="rounded-md  py-2 text-lg font-medium underline">
          Clientes
        </h1>
        <div className="flex justify-between mt">
          <h4 className="rounded-md py-2 text-sm font-medium">
            Tela de Clientes
          </h4>
          <button
            onClick={() => {
              setClient({} as ClientI);
              setShowModalUpOrCreate(true);
              setTitleModal("Criar cliente");
            }}
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Criar Cliente
          </button>
        </div>

        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              {columns.map((item, i) => (
                <th key={i} scope="col" className="px-6 py-3">
                  {item.text}
                </th>
              ))}
              <th className="px-6 py-3">Ações</th>
            </tr>
          </thead>
          <tbody className={data.length > 0 ? "" : "hidden"}>
            {data.map((item: ClientI, i: number) => (
              <tr
                key={"data" + i}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <td className="px-6 py-4" key={++i}>
                  {item.des_nome}
                </td>
                <td className="px-6 py-4" key={++i}>
                  {item.des_contato}
                </td>
                <td className="px-6 py-4" key={++i}>
                  {item.dta_ult_pedido
                    ? moment(item.dta_ult_pedido).format("DD/MM/YYYY")
                    : item.dta_ult_pedido}
                </td>
                <td className="px-6 py-4" key={++i}>
                  {moment(item.createdAt).format("DD/MM/YYYY")}
                </td>
                <td className="px-6 py-4" key={++i}>
                  {item.flg_inativo ? (
                    <span className="rounded-md text-red-700 font-medium">
                      INATIVO
                    </span>
                  ) : (
                    <span className="rounded-md text-green-500 font-medium">
                      ATIVO
                    </span>
                  )}
                </td>

                <td className="px-6 py-4 text-right">
                  <div className="flex gap-5">
                    <PencilSquareIcon
                      onClick={() => {
                        setClient(item);
                        setShowModalUpOrCreate(true);
                        setTitleModal("Alterar cliente " + item.des_nome);
                      }}
                      className="cursor-pointer w-8 h-8 ml-1 font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    />
                    <TrashIcon
                      onClick={() => {
                        setClient(item);
                        setShowModalDelete(true);
                      }}
                      className="cursor-pointer w-8 h-8 ml-1 font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL  */}

      {showModalUpOrCreate ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-4xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">{titleModal}</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModalUpOrCreate(false)}
                  >
                    <span className="bg-transparent text-black opacity-60 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <form
                  className="h-auto max-h-100 overflow-auto"
                  onSubmit={creatAndUpdateClient}
                >
                  <div className="px-8 my-3">
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 items-end">
                      <div className="sm:col-span-4">
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Nome Completo
                        </label>
                        <div className="mt-2">
                          <input
                            defaultValue={client.des_nome}
                            onChange={(e) => [
                              (client.des_nome = e.target.value),
                            ]}
                            type="text"
                            name="name"
                            id="name"
                            required
                            className="p-1.5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-2">
                        <div className="relative flex gap-x-3 ">
                          <div className="flex h-6 items-center">
                            <input
                              defaultChecked={client.flg_inativo}
                              onChange={(e) => [
                                (client.flg_inativo = e.target.checked),
                              ]}
                              id="inactive"
                              name="inactive"
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            />
                          </div>
                          <div className="text-sm leading-6">
                            <label
                              htmlFor="inactive"
                              className="font-medium text-gray-900"
                            >
                              Inativo
                            </label>
                            <p className="text-gray-500">
                              Se selecionado inativo.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="sm:col-span-3">
                        <label
                          htmlFor="telephone"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Telefone
                        </label>
                        <div className="mt-2">
                          <InputMask
                            defaultValue={client.des_telefone}
                            onChange={(e) => [
                              (client.des_telefone = e.target.value),
                            ]}
                            mask="(99) 9999-9999"
                            type="text"
                            name="telephone"
                            id="telephone"
                            required
                            className="p-1.5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-3">
                        <label
                          htmlFor="contact"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Contato
                        </label>
                        <div className="mt-2">
                          <InputMask
                            defaultValue={client.des_contato}
                            onChange={(e) => [
                              (client.des_contato = e.target.value),
                            ]}
                            mask="(99) 99999-9999"
                            type="text"
                            name="contact"
                            id="contact"
                            required
                            className="p-1.5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div className="col-span-full">
                        <label
                          htmlFor="address"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Endereço
                        </label>
                        <div className="mt-2">
                          <input
                            defaultValue={client.des_endereco}
                            onChange={(e) => [
                              (client.des_endereco = e.target.value),
                            ]}
                            type="text"
                            name="address"
                            id="address"
                            required
                            className="p-1.5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-2 sm:col-start-1">
                        <label
                          htmlFor="number"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Número
                        </label>
                        <div className="mt-2">
                          <input
                            defaultValue={client.num_endereco}
                            onChange={(e) => [
                              (client.num_endereco = +e.target.value),
                            ]}
                            type="number"
                            name="number"
                            id="number"
                            required
                            className="p-1.5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-2">
                        <label
                          htmlFor="city"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Cidade
                        </label>
                        <div className="mt-2">
                          <input
                            defaultValue={client.des_cidade}
                            onChange={(e) => [
                              (client.des_cidade = e.target.value),
                            ]}
                            type="text"
                            name="city"
                            id="city"
                            required
                            className="p-1.5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-2">
                        <label
                          htmlFor="uf"
                          className="p-1.5 block text-sm font-medium leading-6 text-gray-900"
                        >
                          UF
                        </label>
                        <div className="mt-2">
                          <input
                            defaultValue={client.des_uf}
                            onChange={(e) => [(client.des_uf = e.target.value)]}
                            type="text"
                            name="uf"
                            id="uf"
                            required
                            maxLength={2}
                            className="p-1.5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-2 sm:col-start-1">
                        <label
                          htmlFor="accumulated"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Valor Acumulado
                        </label>
                        <div className="mt-2">
                          <CurrencyInput
                            defaultValue={client.val_venda_acumulado}
                            name="accumulated"
                            id="accumulated"
                            disabled={true}
                            intlConfig={{ locale: "pt-BR", currency: "BRL" }}
                            className="p-1.5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-2">
                        <label
                          htmlFor="qtd-sales"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Quantidade de Pedidos de Vendas
                        </label>
                        <div className="mt-2">
                          <input
                            defaultValue={client.qtd_venda_pedidos}
                            type="number"
                            name="qtd-sales"
                            id="qtd-sales"
                            disabled={true}
                            className="p-1.5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-2">
                        <label
                          htmlFor="dt-order"
                          className="p-1.5 block text-sm font-medium leading-6 text-gray-900"
                        >
                          Data do último pedido
                        </label>
                        <div className="dt-order">
                          <input
                            defaultValue={
                              client.dta_ult_pedido
                                ? moment(client.dta_ult_pedido).format(
                                    "DD/MM/YYYY"
                                  )
                                : client.dta_ult_pedido
                            }
                            type="text"
                            name="dt-order"
                            id="dt-order"
                            disabled={true}
                            className="p-1.5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-3">
                        <label
                          htmlFor="dt-order"
                          className="p-1.5 block text-sm font-medium leading-6 text-gray-900"
                        >
                          Data de cadastrado
                        </label>
                        <div className="dt-order">
                          <input
                            defaultValue={
                              client.createdAt
                                ? moment(client.createdAt).format("DD/MM/YYYY")
                                : client.createdAt
                            }
                            type="text"
                            name="dt-order"
                            id="dt-order"
                            disabled={true}
                            className="p-1.5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-3">
                        <label
                          htmlFor="dt-order"
                          className="p-1.5 block text-sm font-medium leading-6 text-gray-900"
                        >
                          Data de alteração
                        </label>
                        <div className="dt-order">
                          <input
                            defaultValue={
                              client.updatedAt
                                ? moment(client.updatedAt).format("DD/MM/YYYY")
                                : client.updatedAt
                            }
                            type="text"
                            name="dt-order"
                            id="dt-order"
                            disabled={true}
                            className="p-1.5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                    <Button
                      text="Cancelar"
                      type="button"
                      load={false}
                      onClick={() => setShowModalUpOrCreate(false)}
                      classButoon="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    />
                    <Button
                      text={!client.cod_cliente ? "Cadastrar" : "Alterar"}
                      type="submit"
                      load={load}
                      classButoon="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    />
                  </div>
                </form>
                {/*footer*/}
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}

      {/* MODAL DELETE */}

      {showModalDelete ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div
                className=" bg-red-100 rounded-lg p-4 mb-4 text-sm text-red-700"
                role="alert"
              >
                <div>
                  <svg
                    className="w-5 h-5 inline mr-3"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span className="font-medium">Deletar Cliente!</span> Tem
                  certeza que deseja excluir o cliente {client.des_nome}?
                </div>
                <div className="flex items-center justify-center p-6 border-t border-solid border-slate-200 rounded-b">
                  <Button
                    text="Cancelar"
                    type="button"
                    load={false}
                    onClick={() => setShowModalDelete(false)}
                    classButoon="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  />
                  <Button
                    text="Confirmar"
                    type="button"
                    load={load}
                    onClick={() => deleteClient()}
                    classButoon="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
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
