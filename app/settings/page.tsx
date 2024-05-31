import AuthButton from '@/components/AuthButton';
import Footer from '@/components/Footer';
import NavMenu from '@/components/navmenu/NavMenu';
import UserSettingsForm from '@/components/user/UserSettingsForm';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function Settings() {
    const supabase = createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return redirect('/login');
    }
    return (
        <div className="flex-1 w-full flex flex-col items-center gap-20">
            <div className="w-full">
                <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
                    <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
                        <NavMenu />
                        <AuthButton />
                    </div>
                </nav>
            </div>

            <div className="animate-in flex-1 flex flex-col gap-20 opacity-0 shrink min-w-xs max-w-xl sm:max-w-xl md:max-w-1xl lg:max-w-2xl xl:max-w-4xl">
                <main className="flex-1 flex flex-col gap-6">
                    <h2 className="font-bold text-4xl mb-4">Settings</h2>
                    <p>
                        User ID: <span className="">{user.id}</span>
                    </p>
                </main>
                <main className="flex-1 flex flex-col gap-6">
                    <UserSettingsForm user={user} />
                </main>
            </div>

            <Footer />
        </div>
    );
}
