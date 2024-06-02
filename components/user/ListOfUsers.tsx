"use client";

import { UserData } from "@/models/UserData";
import { GetAllUsersData } from "@/server/UserDataFunctions";
import { useEffect, useState } from "react";

export default function ListOfUsers() {
    const [users, setUsers] = useState<UserData[]>([]);
    useEffect(() => {
        GetAllUsersData().then((data: UserData[]) => {
            setUsers(data as UserData[]);
        });
    }, []);
    return (
        <div className="flex flex-col w-full h-full text-gray-700 bg-gray-200 shadow-md rounded-xl bg-clip-border min-w-xs max-w-md sm:max-w-lg md:max-w-1xl lg:max-w-2xl xl:max-w-4xl">
            <div className="p-6 px-0 overflow-scroll">
                <table className="w-full text-left table-auto min-w-max">
                    <thead>
                        <tr>
                            <th className="bg-gray-400 border text-left px-8 py-4 text-black">
                                User ID
                            </th>
                            <th className="bg-gray-400 border text-left px-8 py-4 text-black">
                                Full Name
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user: UserData) => (
                            <tr
                                key={user.id}
                                className="bg-slate-200 hover:bg-slate-500 focus:bg-gray-300 active:bg-red-200 text-black hover:text-black focus:text-black active:text-black"
                            >
                                <td className="border px-8 py-4">
                                    <a href={`/player/${user.id}`}>{user.id}</a>
                                </td>
                                <td className="border px-8 py-4">
                                    {user.full_name}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
