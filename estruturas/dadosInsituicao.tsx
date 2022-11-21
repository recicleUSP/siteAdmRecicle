import React from "react";
import InputModel from "./inputModel";
import { FormProvider, useForm } from "react-hook-form";
import { Institution, Manager } from "../utils/types/users"
import { addDoc, collection, doc } from "firebase/firestore";
import { database } from "../utils/firebaseConfig";

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
    const methods = useForm()

    function removeEmptyFields(data) {
        Object.keys(data).forEach(key => {
          if (data[key] === '' || data[key] == null) {
            delete data[key];
          }
        });
        return data;
    }
    const onSubmitFunc = async (values, e) => {
        e.preventDefault()
        const data = removeEmptyFields(values);
        
        const institution : Institution = {
            name: data.name,
            email: data.email,
            phone: data.phone,
            cnpj: data.cnpj,
            address: {
                street: data.street,
                street_number: data.street_number,
                cep: data.cep,
                state_inscription: data.state_inscription
            },
            pickers_count: 0,
        }

        const colInstitutions = collection(database, "institutions");
        const { id: idInstitution } = await addDoc(colInstitutions, institution);

        const manager : Manager = {
            name: data.manager_name,
            email: data.manager_email,
            phone: data.manager_phone,
            cpf: data.manager_cpf,
            institution_id: idInstitution
        }
        const colManagers = collection(database, "managers");
        await addDoc(colManagers, manager);

    };


    return (
        <div className="bg-white py-10 mt-2 border rounded-lg lg:px-10 px-5">
            <FormProvider {...methods} >
            <form onSubmit={methods.handleSubmit(onSubmitFunc)} className="lg:px-20 px-5">
                <h1 className="text-lg font-bold ">{title}</h1>
                <div className="py-4">
                        <InputModel title="NOME" type="text" name="name" required/>
                    <div className="grid grid-cols-2 gap-2 mt-4">
                        <InputModel title="TELEFONE" type="text" name="phone" placeholder={"(XX) XXXXX-XXXX"} required/>
                        <InputModel title="EMAIL" type="email" name="email" required/>
                    </div>
                    <div className="grid lg:grid-cols-3 grid-cols-2 gap-2 mt-4">
                        <InputModel title="CNPJ" type="text"  name="cnpj" placeholder="XX.XXX.XXX/XXXX-XX" required/>
                        <InputModel title="CEP" type="text"  name="cep" placeholder="XXXXX-XXX" />
                        <InputModel className="col-span-2 lg:col-span-1" 
                        title="INSCRIÇÃO ESTADUAL" type="text" name="state_inscription"/>
                    </div>
                    <div className="grid grid-cols-6 gap-2 mt-4">
                        <div className="col-span-5">
                            <InputModel title="LOGRADOURO" type="text"  name="street"/>
                        </div>
                        <InputModel title="Nº" type="text" name="street_number"/>                                
                    </div>                            
                </div>
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
                    <div className="flex justify-end gap-4 mt-5">
                        {/* <Link rel="stylesheet" href="/Instituicao/gerenciar" passHref> */}
                            <button type="submit" className={`btn ${buttonType} !px-10 cursor-pointer !py-2.5 !rounded-lg`}>
                                {buttonText}
                            </button>
                        {/* </Link> */}
                        
                        {/* <Link rel="stylesheet" href="/Instituicao/gerenciar" passHref> */}
                            <button type="submit" className="btn btn-green-light !px-10 cursor-pointer !py-2.5 !rounded-lg">
                                Cadastrar
                            </button>
                        {/* </Link> */}
                    </div>
                </div>
            </form>  
            </FormProvider>
        </div>
    )
}	