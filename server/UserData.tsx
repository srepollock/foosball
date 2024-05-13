import { createClient } from "@/utils/supabase/server";

export async function CreateUserData(
    userId: string,
    given_name: string,
    sur_name: string
) {
    const supabase = createClient();
    const { error } = await supabase.from("user-data").insert({
        id: userId,
        given_name: given_name,
        sur_name: sur_name,
        full_name: given_name + " " + sur_name,
    });

    if (error) {
        console.log(error);
    }
}
