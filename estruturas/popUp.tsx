import * as React from "react"

export default function PopUp ({ children, show, setShow }: { children: JSX.Element, show: boolean, setShow: (show: boolean) => void }) {
    return (
        <div className={`z-50 fixed top-0 left-0 w-screen h-screen bg-black/40 flex justify-center items-center transition-all
        ${show ? "opacity-100 w-full" : "opacity-0 w-0"}`}>
            <div className="bg-background-light rounded-lg w-1/3">
                <div className="p-10">
                    {children}
                </div>
            </div>
        </div>
    )
}