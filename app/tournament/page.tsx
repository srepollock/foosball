import AuthButton from '@/components/AuthButton';
import Footer from '@/components/Footer';
import PageHeader from '@/components/PageHeader';
import NavMenu from '@/components/navmenu/NavMenu';
import NewTournamentForm from '@/components/tournaments/NewTournamentForm';
import TournamentDetails from '@/components/tournaments/TournamentDetails';
import ListOfTournaments from '@/components/tournaments/ListOfTournaments';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function TournamentDashboard() {
    const supabase = createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return redirect('/login');
    }
    return (
        <div className="flex-1 w-full flex flex-col gap-20 items-center">
            <PageHeader pageName="Tournaments" />
            <div className="animate-in flex-1 flex flex-col gap-20 opacity-0 max-w-4xl px-3 w-full">
                <ListOfTournaments page={0} />
                <NewTournamentForm />
            </div>
            <Footer />
        </div>
    );
}
