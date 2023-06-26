import Image from "next/image"   
import Header from "../../estruturas/header"
import Link from "next/link";   

export default function escolherAdmin() {
    return(
        <div className={"bg-background-light h-screen w-full overflow-hidden relative"}> 
            <div className="container lg:px-6 px-2 mx-auto max-w-normal h-full flex justify-center flex-col">
                <div className="mb-10"><Header page="editar"/></div>
                <div className="flex justify-center flex-col text-center bg-white py-10 mt-2 border rounded-lg px-5">
                    <h1 className="text-lg font-bold inline-block mx-auto">
                        Você deseja ser administrador das insitituições ou de uma insituição(administrar os coletores)?
                    </h1>

                    <div className="flex justify-center gap-4 mt-5">
                                <Link rel="stylesheet" href="/" passHref>
                                    <button className={"btn btn-white1 !px-10 cursor-pointer !py-2.5 !rounded-lg"}>
                                    <p className="text-xxs font-medium">ADM INSTITUIÇÕES</p> 
                                    </button>
                                </Link>
                                
                                {/*<Link rel="stylesheet" href="/coletor/gerenciar" passHref>*/}
                                    <button className={`btn btn-green-light !px-10 cursor-pointer !py-2.5 !rounded-lg`}>
                                        <p className="text-xxs font-medium">ADM COLETORES</p>
                                    </button>
                                {/*</Link>*/}
                    </div>
                </div>
            </div>
        </div>
    )
}