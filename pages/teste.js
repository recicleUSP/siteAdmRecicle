import { collection, addDoc } from "firebase/firestore"
import { database } from "../utils/firebaseConfig"

export default function Teste () {
    const col = collection(database, 'teste')
    const saveToDb = async () => {
        await addDoc(col, {
            nome: 'teste123',
            numero: 233123
        })
    }

    return (
        <div>
            <button className="border-2 rounded-lg px-4 py-2" onClick={() => saveToDb()}>Add firebase</button>
        </div>
    )
}     