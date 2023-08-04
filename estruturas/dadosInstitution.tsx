import React from "react";
import InputModel from "./inputModel";
import Link from "next/link"
import { FormProvider, useForm } from "react-hook-form";
import { removeEmptyFields, getNewFields, formatObjectAsInstitution } from "../utils/formUtils"
import { createInstitution, editInstitution } from "../utils/firebaseFunctions";
import { useRouter } from "next/router";

interface FormData {
    title: string,
    buttonText: string, 
    buttonType: string,
    submitFunction?: any
}

export default function DadosInstitution({ type, defaultData, user }: { type: string, defaultData?: any, user?: any }) {

    const router = useRouter();
    const setarValores = (type, defData, id) : FormData => {
        const cadastrar = async (values, e) => {
            e.preventDefault()
            let data = removeEmptyFields(values) as any;
            data = formatObjectAsInstitution(data);
            console.log(user);
            if (user) {
                data["manager_id"] = user.uid;
                console.log(data);
            }
            await createInstitution(data)
            router.back();
        };
    
        const editar = async (values, e) => {
            e.preventDefault()
            // const data = getNewFields(formatObjectAsInstitution(values), defData) as any;
            let data = formatObjectAsInstitution(values) as any;
            if (user) {
                data["manager_id"] = user.uid;
            }
            await editInstitution(data, id);
            router.back();
        }
    
        switch (type) {
            case "cadastro":
                return {
                    title: "Cadastrar Instituição",
                    buttonText: "Cadastrar",
                    buttonType: "btn-green-light",
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

    const previousData = defaultData ? defaultData : { address: {} };

    const id = router.query.id;
    const { title, buttonText, buttonType, submitFunction } = setarValores(type, previousData, id);
    const methods = useForm()
    console.log(previousData);

    return (
        <div className="bg-white py-10 mt-2 border rounded-lg lg:px-10 px-5">
            <FormProvider {...methods} >
            <form onSubmit={methods.handleSubmit(submitFunction)} className="lg:px-20 px-5">
                <h1 className="text-lg font-bold ">{title}</h1>
                <div className="py-4">
                        <InputModel defaultValue={previousData.name} title="NOME" type="text" name="name" required/>
                    <div className="grid grid-cols-2 gap-2 mt-4">
                        <InputModel defaultValue={previousData.phone} title="TELEFONE" type="text" name="phone" mask="(99) 99999-9999" required/>
                        <InputModel defaultValue={previousData.email} title="EMAIL" type="email" name="email" required/>
                    </div>
                    <div className="grid lg:grid-cols-3 grid-cols-2 gap-2 mt-4">
                        <InputModel defaultValue={previousData.cnpj} title="CNPJ" type="text" name="cnpj" mask="99.999.999/0009-99"/>
                        <InputModel defaultValue={previousData.address.cep} title="CEP" type="text"  name="cep" mask="99999-999" />
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
                
                <div className="flex justify-end gap-4 mt-5">
                    <button onClick={() => {router.back();}} className={`btn btn-white1 !px-10 cursor-pointer !py-2.5 !rounded-lg`}>
                        <p className="text-xxs font-medium">Voltar</p> 
                    </button>
                    
                    {/* <Link rel="stylesheet" href="/Instituicao/gerenciar" passHref> */}
                        <button type="submit" className={`btn ${buttonType} !px-10 cursor-pointer !py-2.5 !rounded-lg`}>
                            <p className="text-xxs font-medium">{buttonText}</p> 
                        </button>
                    {/* </Link> */}
                </div>                
            </form>  
            </FormProvider>
        </div>
    )
}	

