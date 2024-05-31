import AuthButton from '@/components/AuthButton';
import Footer from '@/components/Footer';
import NavMenu from '@/components/navmenu/NavMenu';
import TournamentDetails from '@/components/tournaments/TournamentDetails';
import TournamentList from '@/components/tournaments/TournamentList';

export default function TournamentDashboard() {
    return (
        <div className="flex-1 w-full flex flex-col gap-20 items-center">
            <div className="w-full">
                <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
                    <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
                        <NavMenu pageName="Tournaments" />
                        <AuthButton />
                    </div>
                </nav>
            </div>
            <div className="animate-in flex-1 flex flex-col gap-20 opacity-0 max-w-4xl px-3">
                <TournamentList />
            </div>
            <Footer />
        </div>
    );
}
