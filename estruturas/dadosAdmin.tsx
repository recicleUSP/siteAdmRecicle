import React, {useState} from "react";
import InputModel from "./inputModel";
import Link from "next/link";
import { FormProvider, useForm } from "react-hook-form";
import { Picker, Manager } from "../utils/types/users"
import { addDoc, collection, doc } from "firebase/firestore";
import { database } from "../utils/firebaseConfig";
import { removeEmptyFields, getNewFields, formatObjectAsInstitution } from "../utils/formUtils"
import { useRouter } from "next/router";
import { createManager, editPicker } from "../utils/firebaseFunctions";
import PopUp from './popUp'

interface FormData {
    title: string,
    buttonText: string, 
    buttonType: string,
    submitFunction?: any
}

export default function DadosAdmin({ type, defaultData }: { type: string, defaultData?: any }) {

    const router = useRouter();
    const setarValores = (type, defData, id) : FormData => {
        //Func cadastrar picker 
         const cadastrar = async (values, e) => {
             e.preventDefault()
             const data: any = removeEmptyFields(values);
             await createManager(data.password, data);
             router.push("/");
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
                     title: "Cadastrar Administrador",
                     buttonText: "CADASTRAR",
                     buttonType: "btn-green-light",
                     submitFunction: cadastrar,
                 }
             case "editar":
                 return {
                     title: "Editar Administrador",
                     buttonText: "Cancelar",
                     buttonType: "btn-whiteRED",
                     submitFunction: editar,
                 }
             default:
                 return {
                     title: "Cadastrar Administrador",
                     buttonText: "Cadastrar",
                     buttonType: "btn-white1"
                 }
         }
     }

    const previousData = defaultData ? defaultData : { address: {} };
    const id = router.query.id;
    const { title, buttonText, buttonType, submitFunction } = setarValores(type, previousData, id);
    const methods = useForm();

    const [show1st, setShow1st] = useState(false);
    const [show2nd, setShow2nd] = useState(false);
    const [show3rd, setShow3rd] = useState(false);

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
                                <InputModel defaultValue={previousData.birthday} title="Data NASCIMENTO" type="date" name="birthDate" required placeholder={"dd/mm/aaaa"}/>
                            </div>
                            <div className="grid grid-cols-3 gap-3 mt-4">
                                <InputModel defaultValue={previousData.email} title="EMAIL" type="email" name="email" required/>
                                <InputModel defaultValue={previousData.cpf} title="CPF" type="text" name="cpf" mask="999.999.999-99" required/>
                                <InputModel defaultValue={previousData.cpf} title="TELEFONE" type="text" name="phone" mask="(99) 99999-9999" required/>
                            </div>
                            <div className="grid grid-cols-2 gap-2 mt-4">
                                <InputModel title="Senha" type="password" name="password" required/>
                                <InputModel title="Confirmar senha" type="password" name="passwordConfirm" required/>
                            </div>                        
                        </div>
                        <div className="py-2"> 
                            <div className="flex place-self-end gap-4 mt-5">
                                <Link rel="stylesheet" href="/" passHref>
                                    <button type="button" className={"btn btn-white1 !px-10 cursor-pointer !py-2.5 !rounded-lg"}>
                                    <p className="text-xxs font-medium">Voltar</p> 
                                    </button>
                                </Link>
                                
                                <button type="button" onClick={() => setShow1st(true)} className={`btn ${buttonType} !px-10 cursor-pointer !py-2.5 !rounded-lg`}>
                                    <p className="text-xxs font-medium">{buttonText}</p>
                                </button>

                            </div>
                        </div>

                        <PopUp show={show1st} setShow={setShow1st}>
                            <div className="flex justify-center flex-col text-center">
                                <h1 className="text-lg font-bold inline-block mx-auto">
                                Você deseja ser administrador das insitituições ou de uma insituição(administrar os coletores)?
                                </h1>

                                <div className="flex justify-center gap-4 mt-5">
                                    <button type="submit" className={"btn btn-white1 !px-10 cursor-pointer !py-2.5 !rounded-lg"}>
                                        <p className="text-xxs font-medium">ADM INSTITUIÇÕES</p> 
                                    </button>
                                    
                                    <button type="button" onClick={() => { setShow1st(false); setShow2nd(true) }} className={`btn btn-green-light !px-10 cursor-pointer !py-2.5 !rounded-lg`}>
                                        <p className="text-xxs font-medium">ADM COLETORES</p>
                                    </button>
                                </div>
                            </div>
                        </PopUp>

                        <PopUp show={show2nd} setShow={setShow2nd}>
                            <div className="flex justify-center flex-col text-center">
                                <h1 className="text-lg font-bold inline-block mx-auto">
                                A instituição que você deseja cadastrar já existe?
                                </h1>

                                <div className="flex justify-center gap-4 mt-5">
                                    <button type="button" onClick={() => { setShow2nd(false); setShow3rd(true) }} className={"btn btn-green-light !px-10 cursor-pointer !py-2.5 !rounded-lg"}>
                                        <p className="text-xxs font-medium">SIM</p> 
                                    </button>
                                    
                                    {<Link rel="stylesheet" href="/manager/institution" passHref>
                                        <button type="button" className={`btn text-white bg-red-700 !px-10 cursor-pointer !py-2.5 !rounded-lg`}>
                                            <p className="text-xxs font-medium">NÃO</p>
                                        </button>
                                    </Link>}
                                </div>
                            </div>
                        </PopUp>

                        <PopUp show={show3rd} setShow={setShow3rd}>
                            <div className="flex justify-center flex-col text-center">
                                <h1 className="text-lg font-bold inline-block mx-auto">
                                    Digite o CNPJ da instituição
                                </h1>

                                <div className="px-20 mt-2">
                                    <InputModel defaultValue={previousData.cpf} title="CNPJ" type="text" name="cnpj" mask="99.999.999/0009-99"/>
                                </div>

                                <div className="flex justify-center gap-4 mt-5">
                                    <button type="submit" className={"btn btn-green-light !px-10 cursor-pointer !py-2.5 !rounded-lg"}>
                                        <p className="text-xxs font-medium">CONFIRMAR</p> 
                                    </button>
                                    
                                    <button type="button" onClick={() => { setShow3rd(false) }} className={`btn text-white bg-red-700 !px-10 cursor-pointer !py-2.5 !rounded-lg`}>
                                        <p className="text-xxs font-medium">SAIR</p>
                                    </button>
                                </div>
                            </div>
                        </PopUp>
                    </form>
                    </FormProvider>
                </div>
    )
}