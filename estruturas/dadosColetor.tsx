import React from "react";
import InputModel from "./inputModel";
import Link from "next/link"

interface FormData {
    title: string,
    buttonText: string, 
    buttonType: string
}


const setarValores = (type) : FormData => {
    switch (type) {
        case "cadastro":
            return {
                title: "Cadastrar Coletor",
                buttonText: "Cadastrar",
                buttonType: "btn-white1"
            }
        case "editar":
            return {
                title: "Editar Coletor",
                buttonText: "Cancelar",
                buttonType: "btn-whiteRED"
            }
        default:
            return {
                title: "Cadastrar Coletor",
                buttonText: "Cadastrar",
                buttonType: "btn-white1"
            }
    }
}

export default function DadosColetor({ type }: { type: string }) {
    const { title, buttonText, buttonType } = setarValores(type);
    return (
        <div className="bg-white py-10 mt-2 border rounded-lg lg:px-10 px-5">
                    <div className=" lg:px-20 px-5">
                        <h1 className="text-lg font-bold ">{title}</h1>
                        <div className="py-4">
                            <div className="grid grid-cols-6 gap-2 mt-4">
                                <div className="col-span-5">
                                    <InputModel title="NOME" type="text" name="name"/>
                                </div>
                                <InputModel title="Data NASCIMENTO" type="text" name="dataNasc" placeholder={"dd/mm/aaaa"}/>
                            </div>
                            <div className="mt-4 ">
                                <InputModel title="EMAIL" type="email" name="email" />
                            </div>
                            
                            <div className="grid grid-cols-2 gap-2 mt-4">
                                <InputModel title="TELEFONE 1" type="text" name="phone1" placeholder={"(XX) XXXXX-XXXX"} />
                                <InputModel title="TELEFONE 2" type="text" name="phone2" placeholder={"(XX) XXXXX-XXXX"} />

                            </div>
                            <div className="grid lg:grid-cols-3 grid-cols-2 gap-2 mt-4">
                                <InputModel title="CPF" type="text"  name="cpf" placeholder="XXX.XXX.XXX-XX"/>
                                <InputModel title="RG" type="text"  name="rg" placeholder="XX.XXX.XXX-X"/>
                                <InputModel title="CEP" type="text"  name="cep" placeholder="XXXXX-XXX"/>
                               
                            </div>
                            <div className="grid grid-cols-6 gap-2 mt-4">
                                <div className="col-span-5">
                                    <InputModel title="LOGRADOURO" type="text"  name="logradouro"/>
                                </div>
                                <InputModel title="Nº" type="text" name="num"/>                                
                            </div>                            
                        </div>
                        <div className="py-2"> 
                           
                            <div className="flex place-self-end  gap-4 mt-5">
                                <Link rel="stylesheet" href="/Coletor/gerenciar" passHref>
                                    <button className={`btn ${buttonType} !px-10 cursor-pointer !py-2.5 !rounded-lg`}>
                                    <p className="text-xxs font-medium">{buttonText}</p> 
                                    </button>
                                </Link>
                                
                                <Link rel="stylesheet" href="/Coletor/gerenciar" passHref>
                                    <button className="btn btn-green-light !px-10 cursor-pointer !py-2.5 !rounded-lg">
                                        <p className="text-xxs font-medium">Cadastrar</p>
                                    </button>
                                </Link>
                                
                                
                            </div>
                        </div>
                    </div>
                </div>
    )
}