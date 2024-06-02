import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import AddMatchForm from "@/components/matches/AddMatchForm";
import RecentMatches from "@/components/matches/RecentMatches";
import NavMenu from "@/components/navmenu/NavMenu";
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
        <div className="flex-1 w-full flex flex-col items-center gap-20">
            <PageHeader pageName="Dashboard" />

            <div className="animate-in flex-1 flex flex-col gap-20 opacity-0 shrink min-w-xs max-w-xl sm:max-w-xl md:max-w-1xl lg:max-w-2xl xl:max-w-4xl">
                <DashboardHeader />
                <main className="flex-1 flex flex-col gap-6">
                    <h2 className="font-bold text-4xl mb-4">Add a Match</h2>
                    <AddMatchForm />
                </main>
                <main className="flex-1 flex flex-col gap-6">
                    <h2 className="font-bold text-4xl mb-4">
                        Your Recent Matches
                    </h2>
                    <RecentMatches page={0} userId={user.id} />
                </main>
            </div>

            <Footer />
        </div>
    );
}
