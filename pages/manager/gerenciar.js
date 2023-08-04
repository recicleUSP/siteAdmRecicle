import { useEffect, useState } from "react";
import Image from "next/image"   
import Link from "next/link"
import Header from "../../estruturas/header.tsx"
import Table from "../../estruturas/table"
import { database } from "../../utils/firebaseConfig"
import { collection, getDocs, query, where } from "firebase/firestore";
import { getById } from "../../utils/firebaseFunctions";
import Router from "next/router";
import { useSession, getSession } from "next-auth/react";

export async function getServerSideProps(context) {
    // Fetch data from external API
    const session = await getSession(context);
    const user = session.user;
    const userData = await getById(user.uid, "manager");  

    const col = collection(database, 'institutions');
    const q = query(col, where("manager_id", "==", user.uid));
    const querySnapshot = await getDocs(q);
    const institutions = []       
    querySnapshot.forEach((doc) => {
        const newObj = {
            id: doc.id,
            ...doc.data()
        }
        institutions.push(newObj)
    });

    institutions.sort((a, b) => {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      });

    return { 
        props: { 
            institutions,
            session,
            user,
            userData,
        },
    }
  }
  

export default function LoginAdmin({ institutions, userData }) {
    const { status, data: session } = useSession();
    useEffect(() => {
        if (status === "unauthenticated") Router.replace("/auth/login");
    }, [status]);

    const [instList, setInstList] = useState(institutions);

    const handleSearchChange = (e) => {
        if (!e.target.value) return setInstList(institutions)

        const resultsArray = instList.filter(inst => inst.name.includes(e.target.value))

        setInstList(resultsArray)
    }

    const handleSortingChange = (e) => {
        const resultsArray = instList;
        if (e.target.value == "Nome") {
            resultsArray.sort((a, b) => {
                if (a.name < b.name) {
                  return -1;
                }
                if (a.name > b.name) {
                  return 1;
                }
                return 0;
              });
        }
        else { 
            resultsArray.sort((a, b) => parseFloat(a.pickers_count) - parseFloat(b.pickers_count));
        }

        setInstList(resultsArray);
    }

    const tableHead = [
        {title: "Nome da instituição", key: "nome", type: "text"},
        {title: "Coletores gerenciados", key: "coletores", type: "text"},
        {title: "", key: "acoes", type: "actions"},
    ]

    const institutionsFormatted = instList.map(el => {
        return {
            nome: el.name,
            coletores: el.pickers_count,
            acoes: {
                edit: {
                    path: "/institution/editar",
                    params: {
                        id: el.id
                    }
                },
                remove: {
                    path: "/institution/deletar",
                    params: {
                        id: el.id
                    }
                }
            }
        }
    })

    return (
    <>
    <div className={"bg-background-light h-screen w-full overflow-hidden relative"}> 
        <div className="container px-6 mx-auto max-w-normal h-full">
            <Header page="gerenciar" user={userData}/>
            <div className="bg-white py-10 mt-10  border rounded-lg px-10 ">
                <div className="flex justify-between ">
                    <div>
                        <h1 className="font-sans text-lg font-bold">Gerenciamento de Instituições</h1>
                    </div>
                    <Link  rel="stylesheet" href="/institution/cadastrar" passHref>
                        <button className="btn btn-green-light !px-14 !py-2.5 ">
                            <p className="text-xxs font-Inter font-medium ">Cadastrar Instituição</p>
                        </button>
                        
                    </Link>
                </div>
                <div className="flex justify-between py-5">
                    <div className="flex justify-between bg-background-light  px-4 rounded-md">
                        <div className="px-2 text-cinza-fonte text-sm py-2">
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </div>
                        <input className="inputPesquisa outline-none text-xs font-medium  border-background-light bg-background-light placeholder:text-cinza-fonte" type="text" placeholder="Buscar Instituição" onChange={handleSearchChange}/>
                    </div>
                    <div className="flex justify-between bg-background-light  px-4 rounded-md">
                        <div className="px-2 text-cinza-fonte text-sm py-2">
                            <select className="bg-background-light text-xs font-medium" name="Ordenar por" id="" onChange={handleSortingChange}>
                                <option value="Nome">Nome da instituição</option>
                                <option value="qtdColetores">Quantidade Coletores</option>
                            </select>
                        </div>
                    </div>
                   

                </div>
                <Table 
                    head={tableHead}
                    page="instituicao"
                    obj={institutionsFormatted}
                />
            </div>
        </div>    
    </div>
    </>
    )
}