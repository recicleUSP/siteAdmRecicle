import Image from "next/image" 
import React, {useState} from "react"  
import Link from "next/link"
import * as ReactDOM from 'react-dom';

interface FormData {
    posi: string
}

function Page({pageis, user}: {pageis: string, user: any}) {
    const [isOpen, setIsOpen] = useState(false);

    if (pageis == "coletor") {
        return (
            <div className="flex items-center gap-5">
                <Link rel="stylesheet" href="/perfilColetor" passHref>
                    <p className="font-bold text-verde-padrao text-sm cursor-pointer">PERFIL</p>
                </Link>
                <Link rel="stylesheet" href="/" passHref>
                    <button className="btnSair btnSair-green font-bold text-sm text-Inter">SAIR</button>
                </Link>
            </div>
        )
    } else if (pageis == "instituicao") {
        return (
                <Link rel="stylesheet" href="/" passHref>
                    <button className="btnSair btnSair-green font-bold text-sm text-Inter">SAIR</button>
                </Link>
           
        )
    } else if (pageis == "gerenciar") {
        return (
            <div className="relative flex flex-col items-center z-[100] rounded">
                <button onClick={() => setIsOpen((prev) => !prev)} className="p-1 w-full flex items-center justify-between gap-x-5 font-bold text-lg rounded-lg tracking-wider border-4 border-transparent">
                    <i className="fa-solid fa-user"></i>
                    {user.name}
                </button>
                {isOpen && <div className="absolute top-10 flex flex-col items-start rounded-lg p-2 w-full">
                    <Link rel="stylesheet" href="/" passHref className="flex w-full justify-between cursor-pointer p-1 bg-gray-100">
                        Sair
                    </Link>
                </div>}
            </div>
        )
    } else {
        return (
        null
        )
    }
  }
  
  


const setarValores = (page: any) : FormData => {
    switch (page) {
        case "editar":
            return {
                posi: "justify-center",
            }
        case "gerenciar":
            return {
                posi: "justify-between",
            }
        default:
            return {
                posi: "justify-between",
            }
    }
}

export default function Header({page, user}: {page: string, user: any}) {
    const { posi} = setarValores(page);
    return(
        <div className={`flex ${posi} pt-5 `}>
            <Link rel="stylesheet" href="/" passHref>
                <div className="h-full z-10 cursor-pointer">
                    <Image width={296*0.6} height={58*0.6} priority src={"/image/logo.png"} alt="Logo Recicle++"/>
                </div>  
            </Link>            
            <Page pageis={page} user={user}/>
        </div>
        )
}