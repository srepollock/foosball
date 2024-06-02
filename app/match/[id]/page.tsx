import AuthButton from "@/components/AuthButton";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import MatchDetails from "@/components/matches/MatchDetails";
import NavMenu from "@/components/navmenu/NavMenu";

export default function MatchDetailsPage({
    params,
}: {
    params: { id: string };
}) {
    return (
        <div className="flex-1 w-full flex flex-col gap-20 items-center">
            <PageHeader pageName="Matches" />

            <div className="animate-in flex-1 flex flex-col gap-20 opacity-0 max-w-4xl px-3">
                <main className="flex-1 flex flex-col gap-6">
                    <div className="flex-1 w-full flex flex-col gap-20 items-center">
                        <MatchDetails id={params.id} />
                    </div>
                </main>
            </div>

            <Footer />
        </div>
    );
}
