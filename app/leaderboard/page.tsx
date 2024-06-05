import Footer from '@/components/Footer';
import PageHeader from '@/components/PageHeader';
import Leaderboard from '@/components/leaderboard/Leaderboard';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function LeaderboardPage() {
    const supabase = createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return redirect('/login');
    }
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
