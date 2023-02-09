import DadosColetor from "../../estruturas/dadosColetor"
import Header from "../../estruturas/header.tsx"
import { database } from "../../utils/firebaseConfig"
import { doc, getDocFromServer } from "firebase/firestore";


export async function getServerSideProps (context) {
    const { id } = context.query
    const docRef = doc(database, "picker", id);
    const docData = await getDocFromServer(docRef);

    return {
        props: { previousData: JSON.stringify(docData.data()) }
    }
}

export default function editarColetor({previousData}) {
    return(
        <div className={"bg-background h-screen w-full overflow-hidden relative"}>
            <div className="container lg:px-6 px-2 mx-auto max-w-normal h-full">
             <Header page="editar"/>
            <DadosColetor defaultData={JSON.parse(previousData)} type="editar"/>
            </div>

        </div>

    )
}
