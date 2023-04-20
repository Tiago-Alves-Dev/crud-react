import { LockClosedIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import { AuthSignin } from "../../services/service-auth";
import { Link, useNavigate } from "react-router-dom";
import { AuthUserI } from "../../models/authUser";
import Button from "../../components/button";

export default function Signin() {
  const [des_email, setEmail] = useState<string>("");
  const [des_senha, setSenha] = useState<string>("");
  const [load, setLoad] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    setLoad(true);

    const authUser: AuthUserI = await AuthSignin(des_email, des_senha);
    if (authUser) {
      setLoad(false);
      return navigate("/client");
    } else {
      setLoad(false);
    }
  };

  return (
    <>
      <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-6 sm:py-12">
        <div className="relative bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-10">
          <div className="flex min-h-full items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
              <div>
                <img
                  className="mx-auto h-12 w-auto"
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                  alt="Your Company"
                />
                <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                  Faça login em sua conta
                </h2>
              </div>
              <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                <input type="hidden" name="remember" defaultValue="true" />
                <div className="-space-y-px rounded-md shadow-sm">
                  <div>
                    <label htmlFor="email-address" className="sr-only">
                      Endereço de E-mail
                    </label>
                    <input
                      defaultValue={des_email}
                      onChange={(e) => [setEmail(e.target.value)]}
                      id="email-address"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="relative block w-full rounded-t-md border-0 p-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      placeholder="Email address"
                    />
                  </div>
                  <div>
                    <label htmlFor="password" className="sr-only">
                      Senha
                    </label>
                    <input
                      defaultValue={des_senha}
                      onChange={(e) => [setSenha(e.target.value)]}
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      className="relative block w-full rounded-b-md border-0 p-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      placeholder="Password"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end">
                  <div className="text-sm">
                    <Link
                      to={"/signinup"}
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Ainda não tem conta? Clique aqui
                    </Link>
                  </div>
                </div>

                <div>
                  <Button
                    type="submit"
                    text="Entrar"
                    load={load}
                    Icon={
                      <LockClosedIcon
                        className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                        aria-hidden="true"
                      />
                    }
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
