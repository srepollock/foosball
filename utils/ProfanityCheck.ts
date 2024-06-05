export async function ProfanityCheck(text: string) {
    if (text === '') {
        return false;
    }
    const res = await fetch("https://vector.profanity.dev", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
    });
    if (res.ok) {
        const data = await res.json();
        return data.isProfanity;
    } else {
        // throw new Error('Failed to check profanity' + res.statusText);
        return false;
    }
}
