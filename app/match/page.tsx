import AuthButton from "@/components/AuthButton";
import Footer from "@/components/Footer";
import MatchDetails from "@/components/matches/MatchDetails";
import RecentMatches from "@/components/matches/RecentMatches";
import Menu from "@/components/menu/Menu";

export default function MatchPage({ params }: { params: { slug: string } }) {
    console.log(params);
    console.log(params.slug);
    return (
        <div className="flex-1 w-full flex flex-col items-center gap-20 overflow-scroll">
            <div className="w-full">
                <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
                    <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
                        <Menu />
                        <AuthButton />
                    </div>
                </nav>
            </div>

            <div className="animate-in flex-1 flex flex-col gap-20 opacity-0 shrink min-w-xs max-w-xl sm:max-w-xl md:max-w-1xl lg:max-w-2xl xl:max-w-4xl">
                <h1>Settings</h1>
                <RecentMatches page={0} />
            </div>
            <Footer />
        </div>
    );
}
