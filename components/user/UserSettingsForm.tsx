'use client';
import { UserData } from '@/models/UserData';
import { GetUserData, UpdateUserData } from '@/server/UserData';
import { createClient } from '@/utils/supabase/client';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';

export default async function UserSettingsForm() {
    const supabase = createClient();

    const [userData, setUserData] = useState({} as UserData);

    const {
        data: { user },
    } = await supabase.auth.getUser();

    useEffect(() => {
        GetUserData(user.id).then((data) => {
            setUserData(data as UserData);
        });
    }, []);

    return (
        <form className="flex-1 flex flex-col gap-6">
            <label className="text-lg">Email</label>
            <input
                type="email"
                className="w-full p-2 rounded-lg text-black"
                id="email"
                defaultValue={user.email}
                required
                readOnly
            />
            <label className="text-lg">Given Name</label>
            <input
                type="text"
                className="w-full p-2 rounded-lg text-black"
                id="given_name"
                defaultValue={userData.given_name}
                onChange={(e) => {
                    setUserData({
                        ...userData,
                        given_name: e.target.value,
                    });
                }}
                required
            />
            <label className="text-lg">Sur Name</label>
            <input
                type="text"
                className="w-full p-2 rounded-lg text-black"
                id="sur_name"
                defaultValue={userData.sur_name}
                onChange={(e) => {
                    setUserData({
                        ...userData,
                        sur_name: e.target.value,
                    });
                }}
                required
            />
            <button
                className="bg-primary text-white rounded-lg p-2 bg-green-500"
                onClick={async () => {
                    await UpdateUserData(userData).then(() => {
                        redirect('/settings');
                    });
                }}
            >
                Save
            </button>
        </form>
    );
}
