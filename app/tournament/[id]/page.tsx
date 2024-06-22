import Footer from '@/components/Footer';
import AddTournamentMatchForm from '@/components/matches/AddTournamentMatchForm';
import PageHeader from '@/components/PageHeader';
import NewTournamentForm from '@/components/tournaments/NewTournamentForm';
import { TournamentBracket } from '@/components/tournaments/TournamentBracket';
import TournamentDetails from '@/components/tournaments/TournamentDetails';
import { TournamentData } from '@/models/TournamentData';
import { GetTournamentById } from '@/server/TournamentFunctions';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';

export default async function TournamentDetailsPage({
    params,
}: {
    params: { id: string };
}) {
    const supabase = createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return redirect('/login');
    }

    return (
        <div className="flex w-full flex flex-col gap-20 items-center">
            <PageHeader pageName="Tournaments" />
            <div className="animate-in flex-1 flex flex-col gap-20 opacity-0 max-w-4xl px-3 mb-4">
                <TournamentDetails id={params.id} />
            </div>
            <div className="animate-in flex-1 flex flex-col gap-20 opacity-0 max-w-4xl px-3 mb-4">
                <AddTournamentMatchForm id={params.id} />
            </div>
            <Footer />
        </div>
    );
}
