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
        .is("id", user.id);

    if (!userData) {
        await supabase.from("user-data").insert({ id: user.id });
    }

    let content = "";
    if (userData) {
        content = userData[0].given_name + " " + userData[0].sur_name;
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
