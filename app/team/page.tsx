import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import TeamDetails from "@/components/teams/TeamDetails";
import TeamList from "@/components/teams/TeamList";

export default function TeamPage() {
    return (
        <div className="flex-1 w-full flex flex-col gap-20 items-center">
            <PageHeader pageName="Teams" />
            <div className="animate-in flex-1 flex flex-col gap-20 opacity-0 max-w-4xl px-3">
                <TeamList />
            </div>
            <Footer />
        </div>
    );
}
