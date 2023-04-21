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
import { GetAllClientActives } from "../../services/service-client";
import { SalesI } from "../../models/sales";

export default function Sales() {
  const [client, setClient] = useState<[ClientI]>([{} as ClientI]);
  const [sales, setSales] = useState<SalesI>({} as SalesI);
  const [load, setLoad] = useState<boolean>(false);
  const [itemDefault, setitemDefault] = useState<ItemI>({
    cod_venda: "",
    des_produto: "",
    val_unitario: 0,
    qtd_itens: 0,
    val_total: 0,
  });
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
      .then((res: [ClientI]) => setClient(res))
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

  const createSales = () => {
    console.log("sales");
    console.log(sales);
    console.log("Itens");
    console.log(Itens);
  };

  const converterRealNumber = (str: string) => {
    str = str.replace("R$", "");
    str = str.replaceAll(",", "");
    str = str.replaceAll(".", "");
    return Number(str);
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
        <form>
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
                  onChange={(e) => [(sales.dta_venda = e.target.value)]}
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
                  onChange={(event) => (sales.cod_cliente = event.target.value)}
                  required
                  className="p-1.5 block w-full rounded-md border-0 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                >
                  <option defaultValue={""} selected>
                    Selecione
                  </option>
                  {client.map((item, i) => (
                    <option key={i} defaultValue={item.cod_cliente}>
                      {item.des_nome}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <h4 className="rounded-md py-2 text-sm font-medium">
              Item da venda
            </h4>

            {Itens.map((item, i) => (
              <div className="col-span-full grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
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
                      onChange={(e) => [(item.val_unitario = e.target.value)]}
                      name={"valor" + i}
                      id={"valor" + i}
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
                      value={item.val_total}
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
                    onClick={() => addItem()}
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
              onClick={() => createSales()}
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
