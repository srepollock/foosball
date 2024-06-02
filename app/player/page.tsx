import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Footer from "@/components/Footer";
import UserDetails from "@/components/user/UserDetails";
import ListOfUsers from "@/components/user/ListOfUsers";
import NavMenu from "@/components/navmenu/NavMenu";
import PageHeader from "@/components/PageHeader";

export default async function UserPage() {
    const supabase = createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/login");
    }

    return (
        <div className="flex-1 w-full flex flex-col items-center gap-20">
            <PageHeader pageName="Players" />

            <div className="animate-in flex-1 flex flex-col gap-20 opacity-0 px-3 shrink min-w-xs max-w-xl sm:max-w-xl md:max-w-1xl lg:max-w-2xl xl:max-w-4xl">
                <UserDetails id={user.id} />
                <ListOfUsers />
            </div>
            <Footer />
        </div>
    );
}
