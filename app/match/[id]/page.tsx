import AuthButton from "@/components/AuthButton";
import Footer from "@/components/Footer";
import MatchDetails from "@/components/matches/MatchDetails";
import Menu from "@/components/menu/Menu";

export default function MatchDetailsPage({
    params,
}: {
    params: { id: string };
}) {
    return (
        <div className="flex-1 w-full flex flex-col gap-20 items-center">
            <div className="w-full">
                <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
                    <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
                        <Menu />
                        <AuthButton />
                    </div>
                </nav>
            </div>

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
