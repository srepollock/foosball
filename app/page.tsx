import { createClient } from "@/utils/supabase/server";
import DashboardBanner from "@/components/DashboardBanner";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";

export default async function Index() {
    const canInitSupabaseClient = () => {
        // This function is just for the interactive tutorial.
        // Feel free to remove it once you have Supabase connected.
        try {
            createClient();
            return true;
        } catch (e) {
            return false;
        }
    };

    const isSupabaseConnected = canInitSupabaseClient();

    return (
        <div className="flex-1 w-full flex flex-col gap-20 items-center">
            <PageHeader pageName="dashboard" />

            <DashboardBanner />

            <Footer />
        </div>
    );
}
