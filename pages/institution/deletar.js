import { collection, doc, getDoc } from "firebase/firestore"
import { useRouter } from "next/router"
import Header from "../../estruturas/header"
import { database } from "../../utils/firebaseConfig"
import Link from "next/link"
import { deleteInstitution } from "../../utils/firebaseFunctions"

export async function getServerSideProps (context) {
    const { id } = context.query
    const col = collection(database, "institutions")
    const newDoc = doc(col, id)
    const docSnap = await getDoc(newDoc)
    const institution = docSnap.data()
    institution.id = docSnap.id
    return { props: { data: JSON.stringify(institution) } }

}
 
export default function DeleteInstitution ({ data }) {
    const parsedData = JSON.parse(data)
    const { name, id } = parsedData
    const router = useRouter();

    return (
    <div>
        <div className={"bg-background-light h-screen w-full overflow-hidden relative"}> 
            <div className="container px-6 mx-auto max-w-normal h-full">
                <Header  type="instituicao" />
                <div className="bg-white rounded-lg p-10 mt-5">
                    <h1 className="text-2xl font-bold text-center">Deletar instituição</h1>
                    <p className="text-center mt-5">Tem certeza que deseja deletar a instituição <span className="font-bold text-red">{name}</span>
                    ? Essa ação não pode ser desfeita.
                    </p>
                    <div className="flex gap-6 justify-center mt-5">
                        <Link href="/instituicao/gerenciar" passHref>
                            <button className="btn btn-white">Voltar</button>
                        </Link>
                        <button className="btn btn-red" onClick={() => {deleteInstitution(id); router.back();}}>
                            Deletar
                        </button>
                    </div>
                </div>
            </div>
        </div>  
    </div>
    )
}