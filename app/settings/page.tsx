import AuthButton from "@/components/AuthButton";
import Footer from "@/components/Footer";
import AddMatchForm from "@/components/matches/AddMatchForm";
import RecentMatches from "@/components/matches/RecentMatches";
import Menu from "@/components/menu/Menu";
import DashboardHeader from "@/components/user/DashboardHeader";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function Settings() {
    const supabase = createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/login");
    }
    return (
        <div className="flex-1 w-full flex flex-col items-center gap-20 overflow-scroll">
            <div className="w-full">
                <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
                    <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
                        <Menu />
                        <AuthButton />
                    </div>
                </nav>
            </div>

            <div className="animate-in flex-1 flex flex-col gap-20 opacity-0 shrink min-w-xs max-w-xl sm:max-w-xl md:max-w-1xl lg:max-w-2xl xl:max-w-4xl">
                <h1>Settings</h1>
            </div>

            <Footer />
        </div>
    );
}
