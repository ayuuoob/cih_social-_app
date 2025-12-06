const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config({ path: '.env.local' });

async function run() {
    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
    console.log("Testing with API Key:", apiKey ? apiKey.substring(0, 10) + "..." : "MISSING");

    if (!apiKey || apiKey === 'your_api_key_here') {
        console.error("ERROR: Invalid API Key.");
        return;
    }

    const genAI = new GoogleGenerativeAI(apiKey);

    // Test the user's specific model request "gemini-2.5-flash"
    // It might be a persistent typo by the user or a very new model, but we must test it since they said it worked.
    try {
        console.log("Sending request to Gemini (gemini-2.5-flash)...");
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
        const result = await model.generateContent("Hello, are you working?");
        const response = await result.response;
        const text = response.text();
        console.log("SUCCESS! Response:", text);
    } catch (error) {
        console.error("2.5-flash FAILED. Trying gemini-2.0-flash-exp...");
        try {
            const modelPro = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" }); // Fallback
            const resultPro = await modelPro.generateContent("Hello, are you working?");
            const responsePro = await resultPro.response;
            console.log("SUCCESS with gemini-2.0-flash-exp! Response:", responsePro.text());
        } catch (errPro) {
            console.error("All models FAILED.");
            // Try the standard one one last time just in case python vs node sdk diff
            try {
                const modelStd = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
                const resultStd = await modelStd.generateContent("Hello?");
                console.log("SUCCESS with gemini-1.5-flash (3rd try)!");
            } catch (e) {
                console.error("Final failure details:", e);
            }
        }
    }
}

run();
