import Image from "next/image"   
import React from "react"  

import Link from "next/link"

export default function HeaderColetores() {
    return(
        <div className="flex justify-between py-5 ">
            <Link rel="stylesheet" href="/" passHref>
                <div className="h-full z-10 cursor-pointer">
                    <Image width={296*0.6} height={58*0.6} priority src={"/image/logo.png"} alt="Logo Recicle++"/>
                </div>  
            </Link>
            <div className="flex items-center gap-5">
                <Link rel="stylesheet" href="/perfilInstituicao" passHref>
                    <p className="font-bold text-verde-padrao text-sm cursor-pointer">PERFIL</p>
                </Link>
                <Link rel="stylesheet" href="/" passHref>
                    <button className="btnSair btnSair-green font-bold text-sm text-Inter">SAIR</button>
                </Link>
            </div>
            
        </div>
        )
}