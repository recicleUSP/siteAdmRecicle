import { formatObjectAsInstitution, formatObjectAsPicker, removeEmptyFields } from "./formUtils";
import { addDoc, collection, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { database } from "../utils/firebaseConfig";
import { Institution, Manager, Picker } from "./types/users";

//Institution functions
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

export async function deleteInstitution (id: string) : Promise<void> {
    const colInstitutions = collection(database, "institutions");
    const docInstitution = doc(colInstitutions, id);
    deleteDoc(docInstitution);
}

//Picker functions
export async function createPicker (data : any, idInstitution : string) : Promise<void> {
    const picker : Picker = formatObjectAsPicker(data, idInstitution);
    const colPickers = collection(database, "picker");
    await addDoc(colPickers, picker);
}

export async function editPicker (data: any, id: string) : Promise<void> {
    const colPickers = collection(database, "picker");
    const docPicker = doc(colPickers, id);
    updateDoc(docPicker, data);
}

export async function deletePicker (id: string) : Promise<void> {
    const colPickers = collection(database, "picker");
    const docPicker = doc(colPickers, id);
    deleteDoc(docPicker);
}