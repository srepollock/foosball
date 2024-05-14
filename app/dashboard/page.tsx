import AuthButton from "@/components/AuthButton";
import Footer from "@/components/Footer";
import AddMatchForm from "@/components/matches/AddMatchForm";
import RecentMatches from "@/components/matches/RecentMatches";
import Menu from "@/components/menu/Menu";
import DashboardHeader from "@/components/user/DashboardHeader";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function Dashboard() {
    const supabase = createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/login");
    }
    return (
        <div className="flex-1 w-full flex flex-col gap-20 items-center">
            <div className="w-full">
                <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
                    <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
                        <Menu />
                        <AuthButton />
                    </div>
                </nav>
            </div>

            <div className="animate-in flex-1 flex flex-col gap-20 opacity-0 max-w-4xl px-3">
                <DashboardHeader />
                <main className="flex-1 flex flex-col gap-6">
                    <h2 className="font-bold text-4xl mb-4">Add a Match</h2>
                    <AddMatchForm />
                </main>
                <main className="flex-1 flex flex-col gap-6">
                    <h2 className="font-bold text-4xl mb-4">Recent Matches</h2>
                    <RecentMatches page={0} userId={user.id} />
                </main>
            </div>

            <Footer />
        </div>
    );
}
