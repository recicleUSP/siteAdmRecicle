import React from "react";
import InputModel from "./inputModel";
import Link from "next/link"
import { FormProvider, useForm } from "react-hook-form";
import { removeEmptyFields, getNewFields, formatObjectAsInstitution } from "../utils/formUtils"
import { createInstitution, editInstitution } from "../utils/firebaseFunctions";
import { useRouter } from "next/router";
import ErrorSucessBox from "./gerais/errorSucessBox";

interface FormData {
    title: string,
    buttonText: string, 
    buttonType: string,
    submitFunction?: any
}

const setarValores = (type, defData, id) : FormData => {
    const cadastrar = async (values, e) => {
        e.preventDefault()
        const data = removeEmptyFields(values) as any;
        await createInstitution(data)
    };

    const editar = async (values, e) => {
        e.preventDefault()
        // const data = getNewFields(formatObjectAsInstitution(values), defData) as any;
        const data = formatObjectAsInstitution(values) as any;
        await editInstitution(data, id)
    }

    switch (type) {
        case "cadastro":
            return {
                title: "Cadastrar Instituição",
                buttonText: "Cadastrar",
                buttonType: "btn-white1",
                submitFunction: cadastrar,
            }
        case "editar":
            return {
                title: "Editar Instituição",
                buttonText: "Editar",
                buttonType: "btn-whiteRED",
                submitFunction: editar,
            }
        default:
            return {
                title: "Cadastrar Instituição",
                buttonText: "Cadastrar",
                buttonType: "btn-white1"
            }
    }
}


export default function DadosInstituicao({ type, defaultData }: { type: string, defaultData?: any }) {
    const previousData = defaultData ? defaultData : { address: {} };

    const router = useRouter();
    const id = router.query.id;
    const { title, buttonText, buttonType, submitFunction } = setarValores(type, previousData, id);
    const methods = useForm()

    return (
        <div className="bg-white py-10 mt-2 border rounded-lg lg:px-10 px-5">
            <FormProvider {...methods} >
            <form onSubmit={methods.handleSubmit(submitFunction)} className="lg:px-20 px-5">
                <h1 className="text-lg font-bold ">{title}</h1>
                <div className="py-4">
                        <InputModel defaultValue={previousData.name} title="NOME" type="text" name="name" required/>
                    <div className="grid grid-cols-2 gap-2 mt-4">
                        <InputModel defaultValue={previousData.phone} title="TELEFONE" type="text" name="phone" placeholder={"(XX) XXXXX-XXXX"} required/>
                        <InputModel defaultValue={previousData.email} title="EMAIL" type="email" name="email" required/>
                    </div>
                    <div className="grid lg:grid-cols-3 grid-cols-2 gap-2 mt-4">
                        <InputModel defaultValue={previousData.cnpj} title="CNPJ" type="text"  name="cnpj" placeholder="XX.XXX.XXX/XXXX-XX" required/>
                        <InputModel defaultValue={previousData.address.cep} title="CEP" type="text"  name="cep" placeholder="XXXXX-XXX" />
                        <InputModel defaultValue={previousData.address.state_inscription} className="col-span-2 lg:col-span-1" 
                        title="INSCRIÇÃO ESTADUAL" type="text" name="state_inscription"/>
                    </div>
                    <div className="grid grid-cols-6 gap-2 mt-4">
                        <div className="col-span-5">
                            <InputModel defaultValue={previousData.address.street} title="LOGRADOURO" type="text"  name="street"/>
                        </div>
                        <InputModel defaultValue={previousData.address.street_number} title="Nº" type="text" name="street_number"/>                                
                    </div>                            
                </div>
                { type === 'cadastro' ? 
                <>
                    <h5 className=" font-bold mt-5 ">Dados do responsável</h5>
                    <div className="py-2"> 
                        <div className="grid grid-cols-3 gap-2 ">
                            <div className="col-span-2"> 
                                <InputModel title="NOME" type="text" name="manager_name" required/>
                            </div>
                            <div className="col-span-1">

                                <InputModel title="CPF" type="text" name="manager_cpf" placeholder="XXX.XXX.XXX-XX" required/>
                            </div>
                        </div>  
                        <div className="grid grid-cols-2 gap-2 mt-4">
                            <InputModel title="EMAIL" type="email" name="manager_email" required/>
                            <InputModel title="TELEFONE" type="text" name="manager_phone" placeholder={"(XX) XXXXX-XXXX"} required/>
                        </div>
                    </div>
                </>
                : null }
                {true ?
                    <ErrorSucessBox type="sucesso" message="Essa é uma mensagem de sucesso!"/>
                : null}
                    <div className="flex justify-end gap-4 mt-5">
                        <Link rel="stylesheet" href="/instituicao/gerenciar" passHref> 
                            <button className={`btn btn-white1 !px-8 cursor-pointer !py-2 text-sm font-bold !rounded-lg`}>
                                Voltar
                            </button>
                        </Link> 
                        
                        {/* <Link rel="stylesheet" href="/Instituicao/gerenciar" passHref> */}
                            <button type="submit" className="btn btn-green-light !px-8 cursor-pointer !py-2 text-sm font-bold !rounded-lg">
                                {buttonText}
                            </button>
                        {/* </Link> */}
                    </div>                
            </form>  
            </FormProvider>
        </div>
    )
}	