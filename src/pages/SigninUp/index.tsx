import { LockClosedIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import { AuthSignin } from "../../services/service-auth";
import { Link, useNavigate } from "react-router-dom";
import { AuthUser } from "../../models/authUser";
import { toast } from "react-toastify";
import { CreateUser } from "../../services/service-users";
import Button from "../../components/button";

export default function SigninUp() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [des_nome, setNome] = useState<string>("");
  const [des_email, setEmail] = useState<string>("");
  const [des_senha, setSenha] = useState<string>("");
  const [des_senhaConfirm, setSenhaConfirm] = useState<string>("");
  const [load, setLoad] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    if (des_senha !== des_senhaConfirm) {
      return toast.error("Senhas não conferem");
    }

    setLoad(true);

    CreateUser({ des_email, des_nome, des_senha })
      .then((res) => {
        console.log(res);
        toast.success("Sucesso! Cadastro efetuado com sucesso");
        setLoad(false);
      })
      .catch((err) => {
        toast.warn(
          err.response?.data.message ? err.response.data.message : err.message
        );
        setLoad(false);
      });

    // const authUser = (await AuthSignin(email, senha)) as AuthUser;
    // if (authUser?.user) {
    //   return navigate("/dashboard");
    // }
  };

  return (
    <>
      <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-6 sm:py-12">
        <div className="relative bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-10">
          <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <img
                className="mx-auto h-10 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt="Your Company"
              />
              <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Formulário de Cadastro
              </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="nome"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Nome completo
                  </label>
                  <div className="mt-2">
                    <input
                      defaultValue={des_nome}
                      onChange={(e) => [setNome(e.target.value)]}
                      id="nome"
                      name="nome"
                      type="nome"
                      autoComplete="nome"
                      required
                      className="p-1.5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Endereço de E-mail
                  </label>
                  <div className="mt-2">
                    <input
                      defaultValue={des_email}
                      onChange={(e) => [setEmail(e.target.value)]}
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="p-1.5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Senha
                  </label>
                  <div className="relative mt-2 rounded-md shadow-sm">
                    <input
                      defaultValue={des_senha}
                      onChange={(e) => [setSenha(e.target.value)]}
                      type={showPassword ? "text" : "password"}
                      name="password"
                      id="password"
                      required
                      className=" p-1.5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />

                    {/* Olho aberto  */}
                    <div
                      className="absolute inset-y-0 right-3 flex items-center"
                      onClick={() => setShowPassword(true)}
                    >
                      <svg
                        className={`h-6 text-gray-700 ${
                          !showPassword ? "block" : "hidden"
                        }`}
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 576 512"
                      >
                        <path
                          fill="currentColor"
                          d="M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144 143.93 143.93 0 0 1-144 144zm0-240a95.31 95.31 0 0 0-25.31 3.79 47.85 47.85 0 0 1-66.9 66.9A95.78 95.78 0 1 0 288 160z"
                        ></path>
                      </svg>
                    </div>

                    {/* Olho fechado  */}
                    <div
                      className="absolute inset-y-0 right-3 flex items-center"
                      onClick={() => setShowPassword(false)}
                    >
                      <svg
                        className={`h-6 text-gray-700 ${
                          showPassword ? "block" : "hidden"
                        }`}
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 640 512"
                      >
                        <path
                          fill="currentColor"
                          d="M320 400c-75.85 0-137.25-58.71-142.9-133.11L72.2 185.82c-13.79 17.3-26.48 35.59-36.72 55.59a32.35 32.35 0 0 0 0 29.19C89.71 376.41 197.07 448 320 448c26.91 0 52.87-4 77.89-10.46L346 397.39a144.13 144.13 0 0 1-26 2.61zm313.82 58.1l-110.55-85.44a331.25 331.25 0 0 0 81.25-102.07 32.35 32.35 0 0 0 0-29.19C550.29 135.59 442.93 64 320 64a308.15 308.15 0 0 0-147.32 37.7L45.46 3.37A16 16 0 0 0 23 6.18L3.37 31.45A16 16 0 0 0 6.18 53.9l588.36 454.73a16 16 0 0 0 22.46-2.81l19.64-25.27a16 16 0 0 0-2.82-22.45zm-183.72-142l-39.3-30.38A94.75 94.75 0 0 0 416 256a94.76 94.76 0 0 0-121.31-92.21A47.65 47.65 0 0 1 304 192a46.64 46.64 0 0 1-1.54 10l-73.61-56.89A142.31 142.31 0 0 1 320 112a143.92 143.92 0 0 1 144 144c0 21.63-5.29 41.79-13.9 60.11z"
                        ></path>
                      </svg>
                    </div>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="passwordconfirm"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Confirme a senha
                  </label>
                  <div className="relative mt-2 rounded-md shadow-sm">
                    <input
                      defaultValue={des_senhaConfirm}
                      onChange={(e) => [setSenhaConfirm(e.target.value)]}
                      type={showPassword ? "text" : "password"}
                      name="passwordconfirm"
                      id="passwordconfirm"
                      required
                      className="p-1.5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />

                    {/* Olho aberto  */}
                    <div
                      className="absolute inset-y-0 right-3 flex items-center"
                      onClick={() => setShowPassword(true)}
                    >
                      <svg
                        className={`h-6 text-gray-700 ${
                          !showPassword ? "block" : "hidden"
                        }`}
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 576 512"
                      >
                        <path
                          fill="currentColor"
                          d="M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144 143.93 143.93 0 0 1-144 144zm0-240a95.31 95.31 0 0 0-25.31 3.79 47.85 47.85 0 0 1-66.9 66.9A95.78 95.78 0 1 0 288 160z"
                        ></path>
                      </svg>
                    </div>

                    {/* Olho fechado  */}
                    <div
                      className="absolute inset-y-0 right-3 flex items-center"
                      onClick={() => setShowPassword(false)}
                    >
                      <svg
                        className={`h-6 text-gray-700 ${
                          showPassword ? "block" : "hidden"
                        }`}
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 640 512"
                      >
                        <path
                          fill="currentColor"
                          d="M320 400c-75.85 0-137.25-58.71-142.9-133.11L72.2 185.82c-13.79 17.3-26.48 35.59-36.72 55.59a32.35 32.35 0 0 0 0 29.19C89.71 376.41 197.07 448 320 448c26.91 0 52.87-4 77.89-10.46L346 397.39a144.13 144.13 0 0 1-26 2.61zm313.82 58.1l-110.55-85.44a331.25 331.25 0 0 0 81.25-102.07 32.35 32.35 0 0 0 0-29.19C550.29 135.59 442.93 64 320 64a308.15 308.15 0 0 0-147.32 37.7L45.46 3.37A16 16 0 0 0 23 6.18L3.37 31.45A16 16 0 0 0 6.18 53.9l588.36 454.73a16 16 0 0 0 22.46-2.81l19.64-25.27a16 16 0 0 0-2.82-22.45zm-183.72-142l-39.3-30.38A94.75 94.75 0 0 0 416 256a94.76 94.76 0 0 0-121.31-92.21A47.65 47.65 0 0 1 304 192a46.64 46.64 0 0 1-1.54 10l-73.61-56.89A142.31 142.31 0 0 1 320 112a143.92 143.92 0 0 1 144 144c0 21.63-5.29 41.79-13.9 60.11z"
                        ></path>
                      </svg>
                    </div>
                  </div>
                </div>

                <div>
                  <Button text="Cadastrar" type="submit" load={load} />
                </div>
              </form>

              <div className="flex items-center justify-end mt-5">
                <div className="text-sm">
                  <Link
                    to={"/"}
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Voltar para login
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
