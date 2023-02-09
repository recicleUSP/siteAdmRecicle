import React from "react";
import InputModel from "./inputModel";
import Link from "next/link"
import { FormProvider, useForm } from "react-hook-form";
import { Picker, Manager } from "../utils/types/users"
import { addDoc, collection, doc } from "firebase/firestore";
import { database } from "../utils/firebaseConfig";
import { removeEmptyFields, getNewFields, formatObjectAsInstitution } from "../utils/formUtils"
import { useRouter } from "next/router";
import { createPicker, editPicker } from "../utils/firebaseFunctions";

interface FormData {
    title: string,
    buttonText: string, 
    buttonType: string,
    submitFunction?: any
}


const setarValores = (type, defData, id) : FormData => {
   //Func cadastrar picker 
    const cadastrar = async (values, e) => {
        e.preventDefault()
        const data = removeEmptyFields(values);
        //const { id: idInstitution } = await addDoc(colInstitutions, institution);
        const idInstitution = "1";
        await createPicker(data, idInstitution);
    };  

    //Func editar picker
    const editar = async (values, e) => {
        e.preventDefault()
        const data = formatObjectAsInstitution(values) as any;
        await editPicker(data, id);    
    }


    switch (type) {
        case "cadastro":
            return {
                title: "Cadastrar Coletor",
                buttonText: "Cadastrar",
                buttonType: "btn-white1",
                submitFunction: cadastrar,
            }
        case "editar":
            return {
                title: "Editar Coletor",
                buttonText: "Cancelar",
                buttonType: "btn-whiteRED",
                submitFunction: editar,
            }
        default:
            return {
                title: "Cadastrar Coletor",
                buttonText: "Cadastrar",
                buttonType: "btn-white1"
            }
    }
}

export default function DadosColetor({ type, defaultData }: { type: string, defaultData?: any }) {
    const previousData = defaultData ? defaultData : { address: {} };

    const router = useRouter();
    const id = router.query.id;
    const { title, buttonText, buttonType, submitFunction } = setarValores(type, previousData, id);
    const methods = useForm();

    return (
        <div className="bg-white py-10 mt-2 border rounded-lg lg:px-10 px-5">
                <FormProvider {...methods} >
                    <form onSubmit={methods.handleSubmit(submitFunction)}  className=" lg:px-20 px-5">
                        <h1 className="text-lg font-bold ">{title}</h1>
                        <div className="py-4">
                            <div className="grid grid-cols-6 gap-2 mt-4">
                                <div className="col-span-5">
                                    <InputModel defaultValue={previousData.name} title="NOME" type="text" name="name" required/>
                                </div>
                                <InputModel defaultValue={previousData.birthday} title="Data NASCIMENTO" type="date" name="birthday" required placeholder={"dd/mm/aaaa"}/>
                            </div>
                            <div className="mt-4 ">
                                <InputModel defaultValue={previousData.email} title="EMAIL" type="email" name="email" required/>
                            </div>
                            <div className="grid grid-cols-2 gap-2 mt-4">
                                <InputModel title="Senha" type="password" name="password" required/>
                                <InputModel title="Confirmar senha" type="password" name="passwordConfirm" required/>
                            </div>
                            <div className="grid grid-cols-2 gap-2 mt-4">
                                <InputModel defaultValue={previousData.phone} title="TELEFONE 1" type="text" name="phone" required placeholder={"(XX) XXXXX-XXXX"} />
                                <InputModel defaultValue={previousData.phonealt} title="TELEFONE 2" type="text" name="phonealt" placeholder={"(XX) XXXXX-XXXX"} />

                            </div>
                            <div className="grid lg:grid-cols-3 grid-cols-2 gap-2 mt-4">
                                <InputModel defaultValue={previousData.cpf} title="CPF" type="text" required name="cpf" placeholder="XXX.XXX.XXX-XX"/>
                                <InputModel defaultValue={previousData.rg} title="RG" type="text"  name="rg" placeholder="XX.XXX.XXX-X"/>
                                <InputModel defaultValue={previousData.address.cep} title="CEP" type="text"  name="cep" placeholder="XXXXX-XXX"/>
                               
                            </div>
                            <div className="grid grid-cols-6 gap-2 mt-4">
                                <div className="col-span-5">
                                    <InputModel defaultValue={previousData.address.street} title="LOGRADOURO" type="text"  name="street"/>
                                </div>
                                <InputModel defaultValue={previousData.address.street_number} title="Nº" type="text" name="street_number"/>                                
                            </div>                            
                        </div>
                        <div className="py-2"> 
                           
                            <div className="flex place-self-end  gap-4 mt-5">
                                 <Link rel="stylesheet" href="/coletor/gerenciar" passHref>
                                    <button className={`btn ${buttonType} !px-10 cursor-pointer !py-2.5 !rounded-lg`}>
                                    <p className="text-xxs font-medium">{buttonText}</p> 
                                    </button>
                                </Link>
                                
                                {/*<Link rel="stylesheet" href="/coletor/gerenciar" passHref>*/}
                                    <button className="btn btn-green-light !px-10 cursor-pointer !py-2.5 !rounded-lg">
                                        <p className="text-xxs font-medium">Cadastrar</p>
                                    </button>
                                {/*</Link>*/}
                                
                                
                            </div>
                        </div>
                    </form>
                    </FormProvider>
                </div>
    )
}