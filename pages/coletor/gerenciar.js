import Link from "next/link"
import Header from "../../estruturas/header.tsx"
import Table from "../../estruturas/table"
import { database } from "../../utils/firebaseConfig"
import { collection, getDocs, query, where } from "firebase/firestore";

export async function getServerSideProps() {    
    // Fetch data from external API
    const col = collection(database, 'picker')
    const q = query(col)
    const querySnapshot = await getDocs(q)
    const picker = []
    querySnapshot.forEach((doc) => {
        const newObj = {
            id: doc.id,
            ...doc.data()
        }
        picker.push(newObj)
    });
    return { props: { picker } }
}

export default function loginInstituicao({ picker }) {
    const tableHead = [
        {title: "Nome do coletor", key: "nome", type: "text"},
        {title: "Coletas realizada", key: "coletas", type: "text"},
        {title: "Avaliação", key: "avaliacao", type: "stars"},
        {title: "", key: "acoes", type: "actions"},
    ]

    const pickersFormatted = picker.map(el => {
        return {
            nome: el.name,
            coletas: el.pickers_count,
            avaliacao: el.rating,
            acoes: {
                edit: {
                    path: "/coletor/editardados",
                    params: {
                        id: el.id
                    }
                },
                remove: {
                    path: "/coletor/deletar",
                    params: {
                        id: el.id
                    }
                }
            }
        }   
    })
   

    return(
    <div className={"bg-background h-screen w-full overflow-hidden relative"}> 
        <div className="container px-6 mx-auto max-w-normal h-full">
        <Header  type="coletor" />
            <div className="bg-white py-10 mt-10  border rounded-lg px-10 ">
                <div className="flex justify-between ">
                    <div>
                        <h1 className="font-sans text-lg font-bold">Gerenciamento de Coletores</h1>
                    </div>
                    <Link  rel="stylesheet" href="/coletor/cadastrar" passHref>
                        <button className="btn btn-green-light !px-14 !py-2.5">
                            <p className="text-xs font-Inter font-medium ">Cadastrar Coletor</p>
                        </button>
                        
                    </Link>
                </div>
                <div className="flex justify-between py-5 mt-2">
                    <div className="flex justify-between bg-background-light  px-4 rounded-md">
                        <div className="px-2 text-cinza-fonte text-sm py-2">
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </div>
                        <input className="inputPesquisa outline-none text-xs font-medium  border-background-light bg-background-light placeholder:text-cinza-fonte" type="text" placeholder="Buscar Coletor"/>
                    </div>
                    <div className="flex justify-between bg-background-light  px-4 rounded-md">
                        <div className="px-2 text-cinza-fonte text-sm py-2 ">
                            <select className="bg-background-light text-xs font-medium" name="Ordenar por" id="">
                                <option value="Nome">Nome da instituição</option>
                                <option value="Pontucao">Pontuacao</option>
                                <option value="ColetasRealizadas"> Coletas Realizadas</option>
                            </select>
                        </div>
                    </div>
                </div>
                <Table head={tableHead} page="coletor" obj={pickersFormatted}/>
            </div>
        </div>    

    </div>
    )
}