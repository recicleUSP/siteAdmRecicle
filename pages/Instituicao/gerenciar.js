import Image from "next/image"   
import Link from "next/link"
import Header from "../../estruturas/header.tsx"
import Table from "../../estruturas/table"


export default function loginInstituicao() {
    const tableHead = [
        {title: "Nome da instituição", key: "nome", type: "text"},
        {title: "Coletores gerenciados", key: "coletores", type: "text"},
        {title: "", key: "acoes", type: "actions"},
    ]

    const tableObj = [
        {nome: "João", coletores: "5"},
        {nome: "Maria", coletores: "15"},
        {nome: "Pedro", coletores: "4"},
    ]

    return (
    <div>
    <div className={"bg-background-light h-screen w-full overflow-hidden relative"}> 
        <div className="container px-6 mx-auto max-w-normal h-full">
            <Header  type="instituicao" />
            <div className="bg-white py-10 mt-10  border rounded-lg px-10 ">
                <div className="flex justify-between ">
                    <div>
                        <h1 className="font-sans text-lg font-bold">Gerenciamento de Instituições</h1>
                    </div>
                    <Link  rel="stylesheet" href="/Instituicao/cadastrar" passHref>
                        <button className="btn btn-green-light !px-14 !py-2.5 ">
                            <p className="text-xxs font-Inter font-medium ">Cadastrar Instituição</p>
                        </button>
                        
                    </Link>
                </div>
                <div className="flex justify-between py-5">
                    <div className="flex justify-between bg-background-light  px-4 rounded-md">
                        <div className="px-2 text-cinza-fonte text-sm py-2">
                            <i class="fa-solid fa-magnifying-glass"></i>
                        </div>
                        <input className="inputPesquisa outline-none text-xs font-medium  border-background-light bg-background-light placeholder:text-cinza-fonte" type="text" placeholder="Buscar Instituição"/>
                    </div>
                    <div className="flex justify-between bg-background-light  px-4 rounded-md">
                        <div className="px-2 text-cinza-fonte text-sm py-2">
                            <select className="bg-background-light text-xs font-medium" name="Ordenar por" id="">
                                <option value="Nome">Nome da instituição</option>
                                <option value="qtdColetores">Quantidade Coletores</option>
                            </select>
                        </div>
                    </div>
                   

                </div>
                <Table head={tableHead} page="Instituicao" obj={tableObj}/>
            </div>
        </div>    
    </div>
    </div>
    )
}