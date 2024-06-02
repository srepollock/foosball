import AuthButton from "@/components/AuthButton";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import NavMenu from "@/components/navmenu/NavMenu";
import UserDetails from "@/components/user/UserDetails";

export default function UserDetailsPage({
    params,
}: {
    params: { id: string };
}) {
    return (
        <div className="flex-1 w-full flex flex-col gap-20 items-center">
            <PageHeader pageName="Players" />
            <div className="animate-in flex-1 flex flex-col gap-20 opacity-0 max-w-4xl px-3">
                <UserDetails id={params.id} />
            </div>
            <Footer />
        </div>
    );
}
