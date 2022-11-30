import { formatObjectAsInstitution, removeEmptyFields } from "./formUtils";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { database } from "../utils/firebaseConfig";
import { Institution, Manager } from "./types/users";

export async function createInstitution (data : any) : Promise<void> {
    const institution : Institution = formatObjectAsInstitution(data);

    const colInstitutions = collection(database, "institutions");
    const { id: idInstitution } = await addDoc(colInstitutions, institution);

    const manager : Manager = {
        name: data.manager_name,
        email: data.manager_email,
        phone: data.manager_phone,
        cpf: data.manager_cpf,
        institution_id: idInstitution
    }
    const colManagers = collection(database, "managers");
    await addDoc(colManagers, manager);
}

export async function editInstitution (data: any, id: string) : Promise<void> {
    const colInstitutions = collection(database, "institutions");
    const docInstitution = doc(colInstitutions, id);
    updateDoc(docInstitution, data);
}