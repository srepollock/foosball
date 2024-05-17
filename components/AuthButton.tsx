import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { signOut } from "@/utils/SignOut";

export default async function AuthButton() {
    const supabase = createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    return user ? (
        <div className="flex items-center gap-4">
            <div className="invisible md:visible">Hey, {user.email}!</div>
            <form action={signOut}>
                <button className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover">
                    Logout
                </button>
            </form>
        </div>
    ) : (
        <Link
            href="/login"
            className="py-2 px-3 flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
        >
            Login
        </Link>
    );
}
