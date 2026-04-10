const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/generate", async (req, res) => {
    try {
        const { skills } = req.body;

        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer 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",
                "HTTP-Referer": "http://localhost:3000",
                "X-Title": "Pathfinder AI"
            },
            body: JSON.stringify({
                model: "meta-llama/llama-3-8b-instruct",
                messages: [
                    {
                        role: "user",
                        content: `Act as an expert career advisor.

User Skills: ${skills}

1. Identify skill gaps
2. Suggest best career path
3. Create a 3-month roadmap
4. Suggest free learning resources
5. Estimate time to get a job

Format clearly with headings.`
                    }
                ]
            })
        });

        const data = await response.json();

        console.log("API RESPONSE:", data); // debug

        res.json(data);

    } catch (error) {
        console.error("ERROR:", error);
        res.status(500).json({ error: "Something went wrong" });
    }
});

app.listen(3000, () => {
    console.log("✅ Server running at http://localhost:3000");
});
