"use server";
import { redirect } from "next/navigation";
import { createClient } from "./supabase/server";

export const forgotPassword = async (formData: FormData) => {
    const email = formData.get('email') as string;
    const supabase = createClient();
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) {
        return redirect('/login?message=Could not authenticate user');
    }

    return redirect(
        '/login?message=Check email to continue sign in process'
    );
};