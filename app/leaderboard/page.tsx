import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import Leaderboard from "@/components/leaderboard/Leaderboard";

export default function LeaderboardPage() {
    return (
        <div className="flex-1 w-full flex flex-col gap-20 items-center">
            <PageHeader pageName="Leaderboards" />
            <div className="animate-in flex-1 flex flex-col gap-20 opacity-0 max-w-4xl px-3">
                <Leaderboard />
            </div>
            <Footer />
        </div>
    );
}
