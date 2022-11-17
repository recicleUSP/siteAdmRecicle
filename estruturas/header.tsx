import Image from "next/image" 
import React from "react"  
import Link from "next/link"
import * as ReactDOM from 'react-dom';

interface FormData {
    posi: string
}

function Page(page) {
    const pageis = page.pageis;
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
    } else if (page == "instituicao") {
        return (
                <Link rel="stylesheet" href="/" passHref>
                    <button className="btnSair btnSair-green font-bold text-sm text-Inter">SAIR</button>
                </Link>
           
        )
      
    } else {
        return (
        null
        )
    }
  }
  
  


const setarValores = (page) : FormData => {
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



export default function Header({ page}: { page: string}) {
    const { posi} = setarValores(page);
    return(
        <div className={`flex ${posi} py-5 `}>
            <Link rel="stylesheet" href="/" passHref>
                <div className="h-full z-10 cursor-pointer">
                    <Image width={296*0.6} height={58*0.6} priority src={"/image/logo.png"} alt="Logo Recicle++"/>
                </div>  
            </Link>            
            <Page pageis={page}/>
        </div>
        )
}