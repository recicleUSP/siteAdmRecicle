import React from "react";
import InputModel from "./inputModel";
import Link from "next/link"
import { FormProvider, useForm } from "react-hook-form";
import { Picker, Manager } from "../utils/types/users"
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
        //const { id: idInstitution } = await addDoc(colInstitutions, institution);

        const picker : Picker = {
            institution_id: "",
            name: data.name,
            email: data.email,
            phone: data.phone,
            phonealt: data.phonealt,
            birthday: data.birthday,
            cpf: data.cpf,
            rg: data.rg,
            pickers_count:0,
            rating: 0,
            address: {
                street: data.street,
                street_number: data.street_number,
                cep: data.cep
            }
        }
        console.log(picker);
        
        const colPickers = collection(database, "picker");

       await addDoc(colPickers, picker);

    };



    return (
        <div className="bg-white py-10 mt-2 border rounded-lg lg:px-10 px-5">
                <FormProvider {...methods} >
                    <form onSubmit={methods.handleSubmit(onSubmitFunc)}  className=" lg:px-20 px-5">
                        <h1 className="text-lg font-bold ">{title}</h1>
                        <div className="py-4">
                            <div className="grid grid-cols-6 gap-2 mt-4">
                                <div className="col-span-5">
                                    <InputModel title="NOME" type="text" name="name" required/>
                                </div>
                                <InputModel title="Data NASCIMENTO" type="date" name="birthday" required placeholder={"dd/mm/aaaa"}/>
                            </div>
                            <div className="mt-4 ">
                                <InputModel title="EMAIL" type="email" name="email" required/>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-2 mt-4">
                                <InputModel title="TELEFONE 1" type="text" name="phone" required placeholder={"(XX) XXXXX-XXXX"} />
                                <InputModel title="TELEFONE 2" type="text" name="phonealt" placeholder={"(XX) XXXXX-XXXX"} />

                            </div>
                            <div className="grid lg:grid-cols-3 grid-cols-2 gap-2 mt-4">
                                <InputModel title="CPF" type="text" required name="cpf" placeholder="XXX.XXX.XXX-XX"/>
                                <InputModel title="RG" type="text"  name="rg" placeholder="XX.XXX.XXX-X"/>
                                <InputModel title="CEP" type="text"  name="cep" placeholder="XXXXX-XXX"/>
                               
                            </div>
                            <div className="grid grid-cols-6 gap-2 mt-4">
                                <div className="col-span-5">
                                    <InputModel title="LOGRADOURO" type="text"  name="street"/>
                                </div>
                                <InputModel title="Nº" type="text" name="street_number"/>                                
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