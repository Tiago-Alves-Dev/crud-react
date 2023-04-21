import { useEffect, useState } from "react";
import HeaderApp from "../../components/header";
import { ClientI } from "../../models/client";
import { toast } from "react-toastify";
import {
  DocumentIcon,
  PlusCircleIcon,
  TrashIcon,
} from "@heroicons/react/20/solid";
import { ItemI } from "../../models/item";
import Button from "../../components/button";
import CurrencyInput from "react-currency-input-field";
import {
  GetAllClientActives,
  UpdateClient,
} from "../../services/service-client";
import { SalesI } from "../../models/sales";
import { CreateSales } from "../../services/service-sales";
import { CreateItem } from "../../services/service-salesItem";

export default function Sales() {
  const [clients, setClients] = useState<[ClientI]>([{} as ClientI]);
  const [sale, setSale] = useState<SalesI>({} as SalesI);
  const [releaseItem, setReleaseItem] = useState<boolean>(false);
  const [releaseSelect, setReleaseSelect] = useState<boolean>(false);
  const [load, setLoad] = useState<boolean>(false);
  const itemDefault: ItemI = {
    cod_venda: "",
    des_produto: "",
    val_unitario: 0,
    qtd_itens: 0,
    val_total: 0,
  };
  const [Itens, seItens] = useState<Array<ItemI>>([
    {
      cod_venda: "",
      des_produto: "",
      val_unitario: 0,
      qtd_itens: 0,
      val_total: 0,
    },
  ]);

  const getall = () => {
    GetAllClientActives()
      .then((res: [ClientI]) => setClients(res))
      .catch((err) => {
        toast.warn(
          err.response?.data.message ? err.response.data.message : err.message
        );
      });
  };

  useEffect(() => getall(), []);

  const addItem = () => {
    seItens((prevArray) => [...prevArray, itemDefault]);
  };

  const RemoveItem = (index: number) => {
    const indexFilter = Itens.findIndex((ele, i) => i === index);
    if (indexFilter !== -1) {
      seItens([...Itens.slice(0, index), ...Itens.slice(index + 1)]);
    }
  };

  const createSale = (event: any) => {
    event.preventDefault();

    let valorTotalVenda = Itens.reduce((item, atual) => {
      var cont = item + atual.val_total;
      return cont;
    }, 0);

    sale.val_total_venda = valorTotalVenda;

    let client: ClientI[] = clients.filter(
      (client) => client.cod_cliente === sale.cod_cliente
    );

    seItens([]);
    setTimeout(() => seItens([itemDefault]), 1000);

    setLoad(true);

    CreateSales(sale)
      .then((res) => {
        for (let i = 0; i < Itens.length; i++) {
          if (res.cod_venda) Itens[i].cod_venda = res.cod_venda;
          Itens[i].val_unitario = converterRealNumber(Itens[i].val_unitario);

          CreateItem(Itens[i])
            .then()
            .catch((err) => {
              toast.warn(
                err.response?.data.message
                  ? err.response.data.message
                  : err.message
              );
              setLoad(false);
            });
        }

        // update client
        client[0].val_venda_acumulado =
          client[0].val_venda_acumulado + res.val_total_venda;
        client[0].qtd_venda_pedidos = ++client[0].qtd_venda_pedidos;
        client[0].dta_ult_pedido = new Date();

        UpdateClient(res.cod_cliente, client[0])
          .then(() => {
            toast.success("Sucesso! Venda cadastrada com sucesso");
            seItens([itemDefault]);
            setReleaseItem(false);
            setReleaseSelect(false);
            setLoad(false);
          })
          .catch((err) => {
            toast.warn(
              err.response?.data.message
                ? err.response.data.message
                : err.message
            );
            setLoad(false);
          });
      })
      .catch((err) => {
        toast.warn(
          err.response?.data.message ? err.response.data.message : err.message
        );
        setLoad(false);
      });
  };

  const converterRealNumber = (str: string) => {
    str = str.replace("R$", "");
    str = str.replaceAll(".", "");
    str = str.replaceAll(",", ".");

    var num = parseFloat(str);
    return num;
  };

  return (
    <>
      <HeaderApp />
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 relative overflow-x-auto mt-5">
        <h1 className="rounded-md  py-2 text-lg font-medium underline">
          Venda
        </h1>
        <h4 className="rounded-md py-2 text-sm font-medium">
          Cadastro de Vendas
        </h4>
        <form onSubmit={createSale}>
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-2">
              <label
                htmlFor="dt-sales"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Data da venda
              </label>
              <div className="mt-2">
                <input
                  onChange={(e) => {
                    sale.dta_venda = e.target.value + " 00:00:00";
                    setReleaseSelect(true);
                  }}
                  type="date"
                  name="dt-sales"
                  id="dt-sales"
                  required
                  className="p-1.5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="client"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Cliente
              </label>
              <div className="mt-2">
                <select
                  id="client"
                  name="client"
                  disabled={!releaseSelect}
                  onChange={(event) => {
                    sale.cod_cliente = event.target.value;
                    event.target.value !== ""
                      ? setReleaseItem(true)
                      : setReleaseItem(false);
                  }}
                  required
                  className="p-1.5 block w-full rounded-md border-0 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                >
                  <option value={""} selected>
                    Selecione
                  </option>
                  {clients.map((item, i) => (
                    <option key={i} value={item.cod_cliente}>
                      {item.des_nome}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <h4
              className={`rounded-md py-2 text-sm font-medium ${
                !releaseItem ? "opacity-30" : null
              }`}
            >
              Item da venda
            </h4>

            {Itens.map((item, i) => (
              <div
                className={`col-span-full grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 ${
                  !releaseItem ? "opacity-30" : null
                }`}
              >
                <div className="sm:col-span-2 sm:col-start-1">
                  <label
                    htmlFor={"nome" + i}
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Nome do Produto {i + 1}
                  </label>
                  <div className="mt-2">
                    <input
                      key={i}
                      defaultValue={item.des_produto}
                      onChange={(e) => [(item.des_produto = e.target.value)]}
                      type="text"
                      name={"nome" + i}
                      id={"nome" + 1}
                      disabled={!releaseItem}
                      required
                      className="p-1.5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-1">
                  <label
                    htmlFor={"valor" + 1}
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Valor Unitário
                  </label>
                  <div className="mt-2">
                    <CurrencyInput
                      defaultValue={item.val_unitario}
                      onChange={(e) => {
                        item.val_unitario = e.target.value;
                        item.val_total =
                          converterRealNumber(item.val_unitario) *
                          item.qtd_itens;
                        seItens((prevArray) => [...prevArray]);
                      }}
                      name={"valor" + i}
                      id={"valor" + i}
                      disabled={!releaseItem}
                      intlConfig={{ locale: "pt-BR", currency: "BRL" }}
                      className="p-1.5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-1">
                  <label
                    htmlFor={"qtd" + i}
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Quantidade
                  </label>
                  <div className="mt-2">
                    <input
                      key={i}
                      defaultValue={item.qtd_itens}
                      onChange={(e) => {
                        item.qtd_itens = +e.target.value;
                        item.val_total =
                          converterRealNumber(item.val_unitario) *
                          item.qtd_itens;
                        seItens((prevArray) => [...prevArray]);
                      }}
                      type="number"
                      name={"qtd" + i}
                      id={"qtd" + i}
                      disabled={!releaseItem}
                      required
                      className="p-1.5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-1">
                  <label
                    htmlFor={"total" + i}
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Valor Total
                  </label>
                  <div className="mt-2">
                    <CurrencyInput
                      value={item.val_total ? item.val_total : 0}
                      name={"total" + i}
                      id={"total" + i}
                      disabled={true}
                      intlConfig={{ locale: "pt-BR", currency: "BRL" }}
                      className="p-1.5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="sm:col-span-1 flex items-end justify-end">
                  <PlusCircleIcon
                    key={"icon" + i}
                    onClick={() => (releaseItem ? addItem() : null)}
                    className={
                      i === 0
                        ? "h-5 w-5 text-green-700 hover:text-green-800 cursor-pointer"
                        : "hidden"
                    }
                  />
                  <TrashIcon
                    key={"icon1" + i}
                    onClick={() => RemoveItem(i)}
                    className={
                      i !== 0
                        ? "h-5 w-5 text-red-700 hover:text-red-800 cursor-pointer"
                        : "hidden"
                    }
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <Button
              type="submit"
              text="Cadastrar"
              load={load}
              Icon={
                <DocumentIcon
                  className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                  aria-hidden="true"
                />
              }
            />
          </div>
        </form>
      </div>
    </>
  );
}
