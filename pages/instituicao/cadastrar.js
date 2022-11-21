import Image from "next/image"   
import Header from "../../estruturas/header"
import DadosInstituicao from "../../estruturas/dadosInsituicao"

export default function cadastrarInstituicao() {
    return(
        <div className={"bg-background-light h-screen w-full overflow-hidden relative"}> 
            <div className="container lg:px-6 px-2 mx-auto max-w-normal h-full">
                <Header />
                <DadosInstituicao type="cadastrar"/>
               
            </div>
            {/* <div className="absolute bottom-0 left-0 hidden lg:block">
                <Image src="/image/cuidandomundo.svg" width={400} height={400} priority/>
            </div> */}
        </div>
    )
}