import MatchDetails from "@/components/matches/MatchDetails";
import RecentMatches from "@/components/matches/RecentMatches";

export default function MatchPage({ params }: { params: { slug: string } }) {
    console.log(params);
    console.log(params.slug);
    return (
        <div>
            <RecentMatches page={0} />
        </div>
    );
}
