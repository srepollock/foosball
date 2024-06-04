import AuthButton from "@/components/AuthButton";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import NavMenu from "@/components/navmenu/NavMenu";
import NewTournamentForm from "@/components/tournaments/NewTournamentForm";
import TournamentDetails from "@/components/tournaments/TournamentDetails";
import TournamentList from "@/components/tournaments/TournamentList";

export default function TournamentDashboard() {
    return (
        <div className="flex-1 w-full flex flex-col gap-20 items-center">
            <PageHeader pageName="Tournaments" />
            <div className="animate-in flex-1 flex flex-col gap-20 opacity-0 max-w-4xl px-3">
                <TournamentList />
                <NewTournamentForm />
            </div>
            <Footer />
        </div>
    );
}
