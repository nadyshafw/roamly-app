const { GoogleGenAI } = require("@google/genai");


async function generateActivity({ destination, days, budget, style }) {
    try {
        const contents = `Buat itinerary liburan ${days} hari ke ${destination}, budget total Rp${budget}, gaya liburan: ${style || 'santai'}.
            Balas HANYA JSON array, tiap item: {"title": string, "day": number, "note": string}.
            Isi 3-4 aktivitas per hari, "day" dari 1 sampai ${days}, "note" singkat (1 kalimat)`

        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

        const interaction = await ai.interactions.create({
            model: "gemini-3.1-flash-lite",
            input: contents,
        });

        const text = interaction.output_text.replace(/```json|```/g, '').trim()

        return JSON.parse(text)
    } catch (error) {
        throw error
    }
}

module.exports = generateActivity
