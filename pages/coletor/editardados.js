import DadosColetor from "../../estruturas/dadosColetor"
import Header from "../../estruturas/header.tsx"

export default function editarColetor() {
    return(
        <div className={"bg-background h-screen w-full overflow-hidden relative"}>
            <div className="container lg:px-6 px-2 mx-auto max-w-normal h-full">
             <Header page="editar"/>
            <DadosColetor type="editar"/>
            </div>

        </div>

    )
}
