"use client"

import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

interface UserType {
    _id: string;
    email: string;
    userName: string;
    role: string;
    is_fraud: string;
}

export default function ManageUsers() {
    const session = useSession()
    const user = session.data?.user
    const axiosSecure = useAxiosSecure();
    const [users, setUsers] = useState<UserType[]>([])
    useEffect(() => {
        axiosSecure.get(`/users?email=${user?.email}`)
            .then(res => {
                setUsers(res.data)
            })
    }, [axiosSecure, user])

    const handleMakeAdmin = (user: UserType) => {
        axiosSecure.patch(`/users?id=${user._id}`, { role: "admin" })
            .then(async (res) => {
                console.log(res.data)
                const refectchUsers = await axiosSecure.get("/properties");
                setUsers(refectchUsers.data)
            })
    }
    const handleMakeagent = (user: UserType) => {
        axiosSecure.patch(`/users?id=${user._id}`, { role: "agent" })
            .then(async (res) => {
                console.log(res.data)
                const refectchUsers = await axiosSecure.get("/properties");
                setUsers(refectchUsers.data)
            })
    }
    const handleDeleteUser = (user: UserType) => {
        axiosSecure.delete(`/users?id=${user._id}`)
            .then(async (res) => {
                console.log(res.data)
                const refectchUsers = await axiosSecure.get("/properties");
                setUsers(refectchUsers.data)
            })
    }
    const handleMarkFraud = (user: UserType) => {
        axiosSecure.patch(`/fraud-users?id=${user._id}`, { is_fraud: "fraud" })
            .then(async (res) => {
                console.log(res.data)
                const refectchUsers = await axiosSecure.get("/properties");
                setUsers(refectchUsers.data)
            })
    }

    return (
        <div className="overflow-x-auto">
            <table className="table">
                <thead>
                    <tr>
                        <th></th>
                        <th>User name</th>
                        <th>User email</th>
                        <th>Role</th>
                        <th className="text-center">Change role</th>
                        <th>Price range</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map((user, idx) => <tr key={user._id}>
                            <th>{idx + 1}</th>
                            <td>{user.userName}</td>
                            <td>{user.email}</td>
                            <td className="font-bold">{user.role ? user.role : "User"}</td>
                            <td className="space-y-1">
                                {user.is_fraud ? <h4 className="font-bold text-red">Fraud</h4>
                                    :
                                    <>
                                        <div className="flex justify-end gap-2">
                                            <button onClick={() => handleMakeAdmin(user)}
                                                className="px-2 py-1 rounded bg-gradient-to-br from-teal-500 to-[#0060f0] text-white">Make Admin</button>
                                            <button onClick={() => handleMakeagent(user)}
                                                className="px-2 py-1 rounded bg-gradient-to-br from-teal-500 to-[#0060f0] text-white">Make Agent</button>
                                        </div>
                                        <div className="flex justify-end gap-2">
                                            {user.role === "agent" && <button onClick={() => handleMarkFraud(user)}
                                                className="px-2 py-1 rounded bg-rose-400">Mark as fraud</button>}
                                            <button onClick={() => handleDeleteUser(user)}
                                                className="px-2 py-1 rounded bg-rose-400">Delete User</button>
                                        </div>
                                    </>}
                            </td>
                        </tr>)
                    }
                </tbody>
            </table>
        </div>
    )
}
