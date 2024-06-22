import AuthButton from "@/components/AuthButton";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import AddMatchForm from "@/components/matches/AddMatchForm";
import RecentMatches from "@/components/matches/RecentMatches";
import NavMenu from "@/components/navmenu/NavMenu";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function MatchDashboard() {
    const supabase = createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/login");
    }
    return (
        <div className="flex-1 w-full flex flex-col gap-20 items-center">
            <PageHeader pageName="Matches" />
            <div className="animate-in flex-1 flex flex-col gap-20 opacity-0 max-w-4xl px-3">
                <main className="flex-1 flex flex-col gap-6 max-w-4xl">
                    <h2 className="font-bold text-4xl mb-4">Add a Match</h2>
                    <AddMatchForm />
                </main>
                <main className="flex-1 flex flex-col gap-6 max-w-4xl">
                    <h2 className="font-bold text-4xl mb-4">Recent Matches</h2>
                    <RecentMatches page={0} />
                </main>
            </div>
            <Footer />
        </div>
    );
}
