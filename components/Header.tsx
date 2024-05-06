import NextLogo from "./NextLogo";
import SupabaseLogo from "./SupabaseLogo";

export default function Header() {
    return (
        <div className="flex flex-col gap-16 items-center">
            <h1 className="sr-only">?</h1>
            <p className="text-3xl lg:text-4xl !leading-tight mx-auto max-w-xl text-center">
                A new way to fooseball
            </p>
            <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent my-8" />
            <div className="flex gap-4">
                <p>Record:</p>
            </div>
            <div className="flex gap-4">
                <p>
                    <ul>
                        <li>
                            <p>Matches</p>
                        </li>
                        <li>
                            <p>Players</p>
                        </li>
                        <li>
                            <p>Teams</p>
                        </li>
                        <li>
                            <p>And More!</p>
                        </li>
                    </ul>
                </p>
            </div>
        </div>
    );
}
