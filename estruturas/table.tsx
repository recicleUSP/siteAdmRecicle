import React from 'react'
import { useState } from 'react'
import PopUp from './popUp'
import Link from "next/link"

interface HeadObj {
    title: string,
    type: string,
    key: string,
}

interface Obj {
    [key: string]: any
}

const Star = ({ stars }) => {
    const starText = "★".repeat(Math.floor(stars))
    return (
        <div className="flex gap-2 items-center">
            <div className='text-yellow-500 text-base'>{starText}</div>
            <div className='text-xs'>{stars}</div>
        </div>
    )
}
const Acoes = ({ setShowPopUp, page }) => {
    return (
        <div className="flex gap-2 justify-end text-white">
            <Link rel="stylesheet" href={`/${page}/editardados`}>
            
            
            <div className="bg-emerald-700 flex hover:bg-green-transition rounded-md cursor-pointer w-7 h-7 border transition-all">
                <i className="fa-solid fa-pencil m-auto"/>                
            </div>
            </Link>
            <div className="bg-red flex rounded-md hover:bg-red-light cursor-pointer w-7 h-7 border transition-all "  onClick={() => setShowPopUp(true)}>
                <i className="fa-solid fa-trash m-auto"/>                
            </div>
        </div>
    )

}

const Picker = ({ type, value, popUp, page }) => {
    const { showPopUp, setShowPopUp } = popUp
    switch(type) {
        case 'stars':
            return <Star stars={value}/>
        case 'actions':
            return <Acoes page={page} setShowPopUp={setShowPopUp}/>
        default:
            return <div>{value}</div>
    }
}



export default function defTable ({ head, obj , page} : { head: HeadObj[], obj: Obj[], page: string }) {
    const [showPopUp, setShowPopUp] = useState(false)

    return (
        <>
            <PopUp show={showPopUp} setShow={setShowPopUp}>
                    <div className=" text-center">
                        <p className="text-xl font-semibold tracking-tight ">REMOVER O CADASTRO DA INSTITUIÇÃO nome_da_instituição?</p>
                        <p className="py-6 px-10 text-xxs">Essa ação não poderá ser revertida, tem certeza que deseja excluir?</p>

                    </div>
                    <div className="flex justify-center  gap-4 ">
                        <button className=" btn btn-red  !px-10 !py-2.5 " onClick={() => setShowPopUp(false)}>
                            <p className="font-semibold text-xxs">Cancelar</p>
                        </button>
                        <button className="btn btn-green-light !px-10 !py-2.5">
                            <p className="font-semibold text-xxs">Excluir</p>
                        </button>
                    </div>

                
            </PopUp>
        <table className="table-auto w-full text-sm">
            <thead>
                <tr >
                    {
                        head.map((item : HeadObj, index) => (
                            <th key={index} className=" py-2 text-xs text-gray-300 text-left border-b border-gray-400">
                                {item.title.toUpperCase()}
                            </th>
                        ))
                    }
                </tr>
            </thead>
            <tbody>
                    {
                        obj.map((item : Obj, index) => {
                            const isColored = index % 2 === 0
                            return (
                                <tr key={index}>
                                    {
                                        head.map((headItem : HeadObj, headIndex) => (
                                            <td key={headIndex} className={`px-4 text-sm font-semibold py-2 ${ isColored ? "bg-gray-100" : "bg-white"}`}>
                                                <Picker page={page} type={headItem.type} value={item[headItem.key]} popUp={{showPopUp, setShowPopUp}}/>
                                            </td>
                                        ))
                                    }
                                </tr>
                            )
                        })
                    }
            </tbody>
        </table>
        </>
    )
}