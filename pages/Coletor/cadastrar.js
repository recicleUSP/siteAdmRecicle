import Image from "next/image"   
import DadosColetor from "../../estruturas/dadosColetor"
import Header from "../../estruturas/header"


export default function cadastrarInstituicao() {
    return(
        <div className={"bg-background h-screen w-full overflow-hidden relative"}> 
            <div className="container lg:px-6 px-2 mx-auto max-w-normal h-full">
                <Header />
                <DadosColetor type="cadastrar" />
            </div>
            <div className="absolute bottom-0 right-0 hidden lg:block">
                <Image src="/image/cuidandomundo2.svg" width={400} height={400} priority/>
            </div>
        </div>
    )

}