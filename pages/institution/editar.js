import DadosInstitution from "../../estruturas/dadosInstitution";
import Header from "../../estruturas/header"
import { database } from "../../utils/firebaseConfig"
import { doc, getDocFromServer } from "firebase/firestore";
import { getSession } from "next-auth/react";

export async function getServerSideProps (context) {
    const { id } = context.query
    const docRef = doc(database, "institutions", id);
    const docData = await getDocFromServer(docRef);
    const session = await getSession(context);
    const user = session.user;

    return {
        props: { 
            previousData: JSON.stringify(docData.data()),
            user,
        }
    }
}

export default function editarInstitution({ previousData, user }) {

    return(
        <div className={"bg-background-light h-screen w-full overflow-hidden relative"}> 
            <div className="container lg:px-6 px-2 mx-auto max-w-normal h-full">
                <Header/>
                <DadosInstitution defaultData={JSON.parse(previousData)} user={user} type="editar"/>
            </div>
        </div>

    )
}