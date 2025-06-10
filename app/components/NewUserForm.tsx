import React, { useState } from 'react'
import { dataSchema } from '../utils/zod'

type Props = {
    setRowData: any
    setnewUserDialogOpen: any
    user: any
    setUser: any,
    isEditing: any
}

const NewUserForm: React.FC<Props> = ({ setRowData, setnewUserDialogOpen, user, setUser, isEditing }) => {

    interface User {
        id: number
        first_name: string
        last_name: string
        email: string
    }


    const handleAdd = (user: User) => {
        const isValid = dataSchema.safeParse(user)
        if (!isValid.success) {
            alert(isValid.error.issues[0].message)
            return;
        }
        { isEditing && setRowData((prev: any) => prev.map((item: any) => item.id === user.id ? user : item)) }
        { !isEditing && setRowData((prev: any) => [...prev, { ...user, id: prev.length + 1 }]) };
        setUser({
            id: 0,
            first_name: "",
            last_name: "",
            email: "",
            actions: "Edit"
        })
        setnewUserDialogOpen(false);
    }
    return (
        <div className='absolute w-full h-full z-50 flex justify-center items-center bg-black/50'>
            <div className='bg-white py-10 px-14 flex flex-col gap-7  rounded'>

                <div className='text-2xl font-bold'>
                    {isEditing ? "Edit User" : "Add New User"}
                </div>
                <div className='flex flex-col gap-5 text-sm'>
                    <input className='border pl-1 py-1 rounded border-black/30 outline-none' type="text" value={user.first_name} onChange={(e) => { setUser({ ...user, first_name: e.target.value }) }} placeholder="First Name" />
                    <input className='border pl-1 py-1 rounded border-black/30 outline-none' type="text" value={user.last_name} onChange={(e) => { setUser({ ...user, last_name: e.target.value }) }} placeholder="Last Name" />
                    <input className='border pl-1 py-1 rounded border-black/30 outline-none' type="text" value={user.email} onChange={(e) => { setUser({ ...user, email: e.target.value }) }} placeholder="Email" />
                </div>
                <div className='flex gap-5'>
                    <button onClick={() => { handleAdd(user) }} className='bg-green-400 px-5 py-2 rounded cursor-pointer'>{isEditing ? "Update" : "Add"}</button>
                    <button onClick={() => { setnewUserDialogOpen(false) }} className='bg-red-400 px-5 py-2 rounded cursor-pointer'>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default NewUserForm
