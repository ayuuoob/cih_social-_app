import { GoogleGenerativeAI } from "@google/generative-ai"
import { GoogleGenerativeAIStream, Message, StreamingTextResponse } from "ai"
import { chatbotResponses } from "@/lib/chatbot-responses"

export const runtime = "edge"

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY || "")

const buildGoogleGenAIPrompt = (messages: Message[]) => {
    return {
        contents: messages
            .filter((message) => message.role === "user" || message.role === "assistant")
            .map((message) => ({
                role: message.role === "user" ? "user" : "model",
                parts: [{ text: message.content }],
            })),
    }
}

export async function POST(req: Request) {
    const { messages, language } = await req.json()

    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY
    if (!apiKey || apiKey === 'your_api_key_here') {
        return new Response("Error: Google Gemini API Key is missing. Please add it to .env.local", { status: 400 })
    }

    const contextData = JSON.stringify(chatbotResponses[language as "fr" | "ar"] || chatbotResponses.fr)

    const systemInstruction = language === "ar"
        ? `You are M3ak, a helpful financial assistant for CIH Care. You speak Arabic. Use this knowledge base: ${contextData}. Keep answers concise.`
        : `You are M3ak, a helpful financial assistant for CIH Care. You speak French. Use this knowledge base: ${contextData}. Keep answers concise.`

    // Gemini 1.5 Flash supports system instructions, but for simplicity with this older SDK wrapper approach, 
    // let's rely on the prompt structure or just standard generation.
    // We will pass the system instruction as the first user message if needed, or rely on model capabilities.
    // Actually, let's try to pass it in generation config if possible, but gen-ai SDK v0.1 used simpler methods.
    // Safer: Prepend system instruction to the first message part? 
    // Let's create a new 'user' message with the instruction.

    const promptMessages = buildGoogleGenAIPrompt(messages);

    // Hack to insert system prompt for models that don't support it strictly as system role
    if (promptMessages.contents.length > 0) {
        if (promptMessages.contents[0].role === 'user') {
            promptMessages.contents[0].parts[0].text = systemInstruction + "\n\n" + promptMessages.contents[0].parts[0].text;
        } else {
            // Prepend a user message
            promptMessages.contents.unshift({ role: 'user', parts: [{ text: systemInstruction }] });
        }
    } else {
        promptMessages.contents.push({ role: 'user', parts: [{ text: systemInstruction }] });
    }

    try {
        const geminiStream = await genAI
            .getGenerativeModel({ model: "gemini-2.5-flash" })
            .generateContentStream(promptMessages)

        const stream = GoogleGenerativeAIStream(geminiStream)

        return new StreamingTextResponse(stream)
    } catch (error: any) {
        console.error("Gemini API Error Full:", JSON.stringify(error, null, 2))
        // Attempt to log the response body if it exists on the error
        if (error.response) {
            console.error("Gemini API Error Response:", await error.response.text().catch(() => "No text"))
        }
        return new Response(`Error from Gemini: ${error.message}`, { status: 500 })
    }
}
