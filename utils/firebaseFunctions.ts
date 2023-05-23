import { formatObjectAsInstitution, formatObjectAsPicker, removeEmptyFields } from "./formUtils";
import { addDoc, setDoc, collection, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { database } from "../utils/firebaseConfig";
import { Institution, Manager, Picker } from "./types/users";

//Institution functions
export async function createInstitution (data : any) : Promise<void> {
    const institution : Institution = formatObjectAsInstitution(data);

    const auth = getAuth();
    createUserWithEmailAndPassword(auth, institution.email, institution.password)
      .then((institutionCredential) => {
        // Signed in 
        const institutionId = institutionCredential.user.uid;   
        const docRef = doc(database, "institutions", institutionId);
        
        setDoc(docRef, institution)
        .catch((error) => {
            console.log(error.code+": "+error.message);
        });
        /*
        const manager : Manager = {
            name: data.manager_name,
            email: data.manager_email,
            phone: data.manager_phone,
            cpf: data.manager_cpf,
            institution_id: idInstitution
        }
        const colManagers = collection(database, "managers");
        await addDoc(colManagers, manager);
        */
      })
      .catch((error) => {
        console.log(error.code+": "+error.message);
      });
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