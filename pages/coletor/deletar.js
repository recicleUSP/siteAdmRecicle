import { collection, doc, getDoc } from "firebase/firestore"
import Header from "../../estruturas/header"
import { database } from "../../utils/firebaseConfig"
import Link from "next/link"
import { deleteInstitution } from "../../utils/firebaseFunctions"

export async function getServerSideProps (context) {
    const {id}  = context.query
    const col = collection(database, "picker")
    const newDoc = doc(col, id)
    const docSnap = await getDoc(newDoc)
    const picker = docSnap.data()
    picker.id = docSnap.id
    return { props: { data: JSON.stringify(picker) } }

}

export default function DeletePicker ({ data }) {
    const parsedData = JSON.parse(data)
    const { name, id } = parsedData

    return (
    <div>
        <div className={"bg-background-light h-screen w-full overflow-hidden relative"}> 
            <div className="container px-6 mx-auto max-w-normal h-full">
                <Header  type="picker" />
                <div className="bg-white rounded-lg p-10 mt-5">
                    <h1 className="text-2xl font-bold text-center">Deletar coletor</h1>
                    <p className="text-center mt-5">Tem certeza que deseja deletar o coletor <span className="font-bold text-red">{name}</span>
                    ? Essa ação não pode ser desfeita.
                    </p>
                    <div className="flex gap-6 justify-center mt-5">
                        <Link href="/coletor/gerenciar" passHref>
                            <button className="btn btn-white">Voltar</button>
                        </Link>
                        <button className="btn btn-red" onClick={() => deleteInstitution(id)}>
                            Deletar
                        </button>
                    </div>
                </div>
            </div>
        </div>  
    </div>
    )
}