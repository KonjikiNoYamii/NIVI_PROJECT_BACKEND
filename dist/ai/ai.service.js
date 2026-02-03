import config from "../utils/env";
export class AIService {
    async analyzeAbsensi(prompt) {
        try {
            const apiKey = config.GROQ_API_KEY;
            if (!apiKey)
                return null;
            const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${apiKey}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    // Menggunakan model yang terkonfirmasi AKTIF di list Anda
                    model: "llama-3.3-70b-versatile",
                    messages: [
                        {
                            role: "system",
                            content: "Anda adalah pengasuh pesantren yang bijak dan hangat. Berikan pesan singkat 1-2 kalimat untuk santri yang baru absen dalam Bahasa Indonesia yang santun."
                        },
                        {
                            role: "user",
                            content: prompt
                        }
                    ],
                    temperature: 0.7,
                    max_tokens: 150
                })
            });
            const data = await response.json();
            if (data.error) {
                console.error("[GROQ ERROR]", data.error.message);
                return null;
            }
            // Pastikan mengakses array choices dengan aman
            const text = data.choices?.[0]?.message?.content;
            return {
                comment: text ? text.trim() : "Alhamdulillah, semangat belajarnya ya Nak.",
                confidence: 0.95
            };
        }
        catch (err) {
            console.error("[GROQ FETCH ERROR]", err.message);
            return null;
        }
    }
}
//# sourceMappingURL=ai.service.js.map