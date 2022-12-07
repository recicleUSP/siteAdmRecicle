import React from "react"

export default function ErrorSucessBox ({ message, type }: { message: string, type: string }) {
    let tipo = type[0].toLowerCase() === 'e' ? 'error' : 'sucess'
    return (
        <div className="flex bg-background-light rounded-lg gap-4">
            <div className={`rounded-l-md text-lg flex p-4
            ${tipo == 'error' ? "bg-red-200 text-red-500" : "bg-emerald-200 text-emerald-500"}`}>
                <i className={`fa-solid m-auto ${tipo == 'error' ? "fa-circle-xmark" : "fa-circle-check"}`}/>
            </div>
            <div className="bg-background-light rounded-r-md p-4 pl-0">
                <p className="font-bold text-sm">{tipo == 'error' ? "ERRO" : "SUCESSO"}</p>
                <p className="text-xs">{message}</p>
            </div>
        </div>
    )
}