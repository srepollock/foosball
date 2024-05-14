export async function fetchPlayers() {
            const { data, error } = await supabase
                .from("players")
                .select("id, full_name");
            if (error) {
                console.error("Error fetching players:", error.message);
            } else {
                setPlayers(data);
            }
        };