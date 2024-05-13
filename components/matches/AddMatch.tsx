"use client";
import { AddMatch } from "@/server/Matches";
import { createClient } from "@/utils/supabase/client";
export default async function AddMatchButton() {
    return (
        <div>
            <button onClick={AddMatch}>Add Match</button>
        </div>
    );
}
