import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { useState } from "react";

export default async function DashboardHeader() {
    const supabase = createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/login");
    }

    const { data: userData } = await supabase
        .from("user-data")
        .select()
        .eq("id", user.id);

    if (!userData) {
        const { error } = await supabase.from("user-data").insert({
            id: user.id,
            given_name: "",
            sur_name: "",
            full_name: "",
        });
        if (error) {
            console.log(error);
        }
    }

    let content = "";
    if (userData && userData.length > 0 && userData[0].full_name !== "") {
        content = userData[0].full_name;
    } else {
        content = user.email!;
    }

    return (
        <div className="w-full flex justify-center">
            <h1 className="font-bold text-3xl">
                Welcome to your Dashboard, {content}
            </h1>
        </div>
    );
}
