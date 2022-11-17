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
                title: "Cadastrar Instituição",
                buttonText: "voltar",
                buttonType: "btn-white1"
            }
        case "editar":
            return {
                title: "Editar Instituição",
                buttonText: "Cancelar",
                buttonType: "btn-whiteRED"
            }
        default:
            return {
                title: "Cadastrar Instituição",
                buttonText: "voltar",
                buttonType: "btn-white1"
            }
    }
}


export default function DadosInstituicao({ type }: { type: string }) {
    const { title, buttonText, buttonType } = setarValores(type);
    return (
        <div className="bg-white py-10 mt-2 border rounded-lg lg:px-10 px-5">

            <div className=" lg:px-20 px-5">
                <h1 className="text-lg font-bold ">{title}</h1>
                <div className="py-4">
                        <InputModel title="NOME" type="text" name="name"/>
                    <div className="grid grid-cols-2 gap-2 mt-4">
                        <InputModel title="TELEFONE" type="text" name="phone" placeholder={"(XX) XXXXX-XXXX"} />
                        <InputModel title="EMAIL" type="email" name="email" />
                    </div>
                    <div className="grid lg:grid-cols-3 grid-cols-2 gap-2 mt-4">
                        <InputModel title="CNPJ" type="text"  name="cnpj" placeholder="XX.XXX.XXX/XXXX-XX"/>
                        <InputModel title="CEP" type="text"  name="cep" placeholder="XXXXX-XXX"/>
                        <InputModel className="col-span-2 lg:col-span-1" 
                        title="INSCRIÇÃO ESTADUAL" type="text" name="inscricao_estadual"/>
                    </div>
                    <div className="grid grid-cols-6 gap-2 mt-4">
                        <div className="col-span-5">
                            <InputModel title="LOGRADOURO" type="text"  name="logradouro"/>
                        </div>
                        <InputModel title="Nº" type="text" name="num"/>                                
                    </div>                            
                </div>
                <h5 className=" font-bold mt-5 ">Dados do responsável</h5>
                <div className="py-2"> 
                    <div className="grid grid-cols-3 gap-2 ">
                        <div className="col-span-2"> 
                            <InputModel title="NOME" type="text" name="name"/>
                        </div>
                        <div className="col-span-1">

                            <InputModel title="CPF" type="text" name="cpf" placeholder="XXX.XXX.XXX-XX"/>
                        </div>
                    </div>  
                    <div className="grid grid-cols-2 gap-2 ">
                        <InputModel title="EMAIL" type="email" name="email"/>
                        <InputModel title="TELEFONE" type="text" name="phone" placeholder={"(XX) XXXXX-XXXX"} />
                    </div>
                    <div className="flex justify-end gap-4 mt-5">
                        <Link rel="stylesheet" href="/Instituicao/gerenciar" passHref>
                            <button className={`btn ${buttonType} !px-10 cursor-pointer !py-2.5 !rounded-lg`}>
                            <p className="text-xxs font-medium">{buttonText}</p> 
                            </button>
                        </Link>
                        
                        <Link rel="stylesheet" href="/Instituicao/gerenciar" passHref>
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