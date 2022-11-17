import React from "react"

export default function InputModel ({ title, type, placeholder, name, className }: { title: string, type: string, placeholder?: string, name: string, className?: string }) {
    return (
        <div className={`lg:text-xs text-xxs ${className}`}>
            <label htmlFor={name} className="text-gray-300 font-bold">{title}</label>
            <input placeholder={placeholder}
            className={`rounded-sm pl-3 w-full h-8 outline-none font-medium  border-background-light bg-background-light`}
            type={type} name={name} id={name} />
        </div>
    )
}