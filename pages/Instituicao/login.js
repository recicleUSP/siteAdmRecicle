import Image from "next/image"   
import Link from "next/link"

export default function loginAdm() {
    return(
        <div className="h-screen w-full overflow-hidden relative">
            <div className="flex flex-row h-screen justify-between ">
                <div className="basis-1/2 flex">
                    <div className="my-auto px-24 w-full">
                        <div className="mb-20 cursor-pointer">
                            <Link rel="stylesheet" href="/" passHref>
                                <Image width={296*0.6} height={58*0.6} priority src={"/image/logo.png"} alt="Logo Recicle++"/>
                            </Link>
                        </div>
                        <div className="flex flex-col gap-3 lg:gap-6">
                            <div className="">
                                <h1 className="font-display text-3xl">Login</h1>
                                <p className="font-Poppins text-sm text-cinza-claro">Entre na sua conta de Administrador</p>
                            </div>
                            <div className="py-2 ">
                                <div>
                                    <p className="text-sm">E-mail</p>
                                    <input className="w-full text-lg mt-1  border-solid border rounded-input border-verde-padrao" type="email" />
                                </div>
                                <div className="mt-4">
                                    <p className="text-sm">Senha</p>
                                    <input className="w-full text-lg mt-1 border-solid border rounded-input border-verde-padrao" type="password" />
                                </div>
                                <div className="flex justify-between">
                                    <div></div>
                                    <div>
                                        <a href="/esquecisenha" className="text-xs ml-1 text-verde-padrao houver:underline-offset-1">Esqueci minha senha</a>
                                    </div>                                    
                                </div>
                                <div className="flex py-1">
                                    <input type="checkbox" className="border border-verde-padrao" name="ManterCanectado" id="" />
                                    <p className="px-1 text-sm">Mantenha-me conectado</p>
                                </div>
                                <div className="flex place-content-center justify-between px-8 py-4 ">
                                    <div className="btn btn-white w-full border mr-8 border-solid border-verde-padrao bold ">
                                        <Link rel="stylesheet" href="/" passHref>
                                            <button type="button"  className="w-full ">Voltar</button>
                                        </Link>
                                    </div>
                                    <div className="btn btn-green w-full">
                                        <Link rel="stylesheet" href="/Instituicao/gerenciar" passHref>
                                            <button type="button"  className="w-full">Entrar</button>
                                        </Link>
                                    </div>
                                </div>

                            </div>
                            
                        </div>
                    </div>   
                </div>
                <div className="bg-verde-padrao basis-1/2 relative col-span-5">
                    <div className="absolute w-full h-96 bottom-0 z-10">
                        <Image src="/image/lixo.svg" layout="fill"/>
                    </div>
                    <div className="bg-[url('/image/Vector-login.svg')] w-full h-64 bg-cover bottom-0 absolute bg-center"></div>
                </div>
            </div>
        </div>
    )

}