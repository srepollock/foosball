"use client";
import { useRouter } from "next/navigation";
export default function Menu() {
    const router = useRouter();
    return (
        <div className="flex flex-row gap-4">
            <button onClick={() => router.push("/dashboard")}>Dashboard</button>
            <button onClick={() => router.push("/user")}>Players</button>
            <button onClick={() => router.push("/matches")}>Matches</button>
            <button onClick={() => router.push("/settings")}>Settings</button>
        </div>
    );
}
