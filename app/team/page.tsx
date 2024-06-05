import Footer from '@/components/Footer';
import PageHeader from '@/components/PageHeader';
import NewTeamForm from '@/components/teams/NewTeamForm';
import TeamDetails from '@/components/teams/TeamDetails';
import TeamList from '@/components/teams/TeamList';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function TeamPage() {
    const supabase = createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return redirect('/login');
    }
    return (
        <div className="flex-1 w-full flex flex-col gap-20 items-center">
            <PageHeader pageName="Teams" />
            <div className="animate-in flex-1 flex flex-col gap-20 opacity-0 max-w-4xl px-3">
                <TeamList />
                <NewTeamForm />
            </div>
            <Footer />
        </div>
    );
}
