import NextLogo from "./NextLogo";
import SupabaseLogo from "./SupabaseLogo";

export default function DashboardBanner() {
    return (
        <div className="flex flex-col gap-16 items-center">
            <h1 className="sr-only">?</h1>
            <p className="text-3xl lg:text-4xl !leading-tight mx-auto max-w-xl text-center">
                A new way to foosball
            </p>
        </div>
    );
}
