import React from "react"
import { useFormContext } from "react-hook-form"

export default function InputModel ({ title, type, placeholder, name, className, required, defaultValue }:
    { title: string, type: string, placeholder?: string, name: string, className?: string, required?: boolean, defaultValue?: string }) {
    const ConnectForm = ({ children } : { children?: any }) => {
        const methods = useFormContext();
        return children({ ...methods });
    };

    return (
        <ConnectForm>
            {({ register }) => 
                <div className={`lg:text-xs text-xxs ${className}`}>
                    <label htmlFor={name} className="text-gray-300 font-bold">
                        {title} 
                        <span className="text-red font-normal">{required ? " *" : ""}</span>
                    </label>
                    <input defaultValue={defaultValue} placeholder={placeholder} type={type} required={required}
                    className={`rounded-sm pl-3 w-full h-8 outline-none font-medium  border-background-light bg-background-light`}
                    {...register(name, {required})}/>
                </div>
            }
        </ConnectForm>
    )
}