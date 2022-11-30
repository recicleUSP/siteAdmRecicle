import DadosInstituicao from "../../estruturas/dadosInstituicao"
import Header from "../../estruturas/header"
import { database } from "../../utils/firebaseConfig"
import { doc, getDocFromServer } from "firebase/firestore";

export async function getServerSideProps (context) {
    const { id } = context.query
    const docRef = doc(database, "institutions", id);
    const docData = await getDocFromServer(docRef);

    return {
        props: { previousData: JSON.stringify(docData.data()) }
    }
}

export default function editarInstituicao({ previousData }) {

    return(
        <div className={"bg-background-light h-screen w-full overflow-hidden relative"}> 
            <div className="container lg:px-6 px-2 mx-auto max-w-normal h-full">
                <Header/>
                <DadosInstituicao defaultData={JSON.parse(previousData)} type="editar"/>
            </div>
        </div>

    )
}