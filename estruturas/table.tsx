import React from 'react'
import { useState } from 'react'
import PopUp from './popUp'
import Link from "next/link"
import { deleteDoc } from "firebase/firestore"
import { getQueriesFromObject } from '../utils/formUtils'

interface HeadObj {
    title: string,
    type: string,
    key: string,
}

interface Obj {
    [key: string]: any
}

const Star = ({ stars }) => {
    const starText = "★".repeat(Math.floor(stars))
    return (
        <div className="flex gap-2 items-center">
            <div className='text-yellow-500 text-base'>{starText}</div>
            <div className='text-xs'>{stars}</div>
        </div>
    )
}
const Acoes = ({ setShowPopUp, config }) => {
    const { edit, remove } = config
    const editURL = edit ? edit.path : "/"
    const editParams = edit ? edit.params : {}
    const editQueries = getQueriesFromObject(editParams)
    const removeURL = remove ? remove.path : "/"
    const removeParams = remove ? remove.params : {}
    const removeQueries = getQueriesFromObject(removeParams)

    return (
        <div className="flex gap-2 justify-end text-white">
            <Link rel="stylesheet" href={editURL + editQueries}>
                <div className="bg-emerald-700 flex hover:bg-green-transition rounded-md cursor-pointer w-7 h-7 border transition-all">
                    <i className="fa-solid fa-pencil m-auto"/>                
                </div>
            </Link>
            <Link rel="stylesheet" href={removeURL + removeQueries}>
                <div className="bg-red flex rounded-md hover:bg-red-light cursor-pointer w-7 h-7 border transition-all ">
                    <i className="fa-solid fa-trash m-auto"/>                
                </div>
            </Link>
        </div>
    )

}

const Picker = ({ type, value, page }) => {
    switch(type) {
        case 'stars':
            return <Star stars={value}/>
        case 'actions':
            return <Acoes config={value}/>
        default:
            return <div>{value}</div>
    }
}



export default function defTable ({ head, obj, page } : 
    { head: HeadObj[], obj: Obj[], page: string }) {

    return (
        <>
        <table className="table-auto w-full text-sm">
            <thead>
                <tr >
                    {
                        head.map((item : HeadObj, index) => (
                            <th key={index} className=" py-2 text-xs text-gray-300 text-left border-b border-gray-400">
                                {item.title.toUpperCase()}
                            </th>
                        ))
                    }
                </tr>
            </thead>
            <tbody>
                    {
                        obj.map((item : Obj, index) => {
                            const isColored = index % 2 === 0
                            return (
                                <tr key={index}>
                                    {
                                        head.map((headItem : HeadObj, headIndex) => (
                                            <td key={headIndex} className={`px-4 text-sm font-semibold py-2 ${ isColored ? "bg-gray-100" : "bg-white"}`}>
                                                <Picker page={page} type={headItem.type} value={item[headItem.key]}/>
                                            </td>
                                        ))
                                    }
                                </tr>
                            )
                        })
                    }
            </tbody>
        </table>
        </>
    )
}