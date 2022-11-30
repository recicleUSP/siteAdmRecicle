import { Institution } from "./types/users";
import { isEqual } from "lodash";

export function removeEmptyFields(data : Object) : Object {
    Object.keys(data).forEach(key => {
      if (data[key] === '' || data[key] == null) {
        delete data[key];
      }
    });
    return data;
}

export function getNewFields (obj1, obj2) : Object {
    console.log(obj1, obj2);
    const newObj = {};
    Object.keys(obj2).forEach(key => {
        if (
                typeof obj1[key] == 'object' && typeof obj2[key] == 'object' &&
                isEqual(obj1[key], obj2[key]) == false
            ) {
            newObj[key] = removeEmptyFields(getNewFields(obj1[key], obj2[key]));
        }

        if (JSON.stringify(obj1[key]) !== JSON.stringify(obj2[key])) {
            newObj[key] = obj1[key];
        }
    });
    return newObj;
}

export function getQueriesFromObject (obj : Object) : string {
    return "?" + Object.keys(obj).map(key => key + '=' + obj[key]).join('&');
}

export function formatObjectAsInstitution (obj) : Institution {
    return {
        name: obj.name,
        email: obj.email,
        phone: obj.phone,
        cnpj: obj.cnpj,
        address: {
            street: obj.street,
            street_number: obj.street_number,
            cep: obj.cep,
            state_inscription: obj.state_inscription
        },
        pickers_count: obj.pickers_count || 0,
    }
}