"use client";
import { useRouter } from "next/navigation";

export default function SignUpButton() {
    const router = useRouter();
    return (
        <button
            className="bg-blue-500 rounded-md px-4 py-2 text-foreground mb-2"
            type="button"
            onClick={() => {
                router.push("/signup");
            }}
        >
            Sign Up
        </button>
    );
}
