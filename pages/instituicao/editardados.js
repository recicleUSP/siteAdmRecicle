import DadosInstituicao from "../../estruturas/dadosInsituicao"
import Header from "../../estruturas/Header"


export default function editarInstituicao() {
    return(
        <div className={"bg-background-light h-screen w-full overflow-hidden relative"}> 
            <div className="container lg:px-6 px-2 mx-auto max-w-normal h-full">
            <Header/>

            <DadosInstituicao type="editar"/>

            </div>
        </div>

    )
}