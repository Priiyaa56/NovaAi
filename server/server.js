import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(
    cors({
        origin: true,
        methods: ["GET", "POST", "OPTIONS"],
    }),
);

app.use(express.json());

app.get("/api/health", (req, res) => {
    res.json({
        status: "ok",
        service: "ai-saas-server",
    });
});

app.post("/api/generate-image", async (req, res) => {
    try {
        const { prompt } = req.body;

        if (!prompt || !prompt.trim()) {
            return res.status(400).json({
                error: "Please provide an image prompt.",
            });
        }

        if (!process.env.PIXAZO_API_KEY) {
            return res.status(500).json({
                error: "PIXAZO_API_KEY is not configured.",
            });
        }

        const response = await fetch(
            "https://gateway.pixazo.ai/flux-1-schnell/v1/getData",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Ocp-Apim-Subscription-Key": process.env.PIXAZO_API_KEY,
                },
                body: JSON.stringify({
                    prompt: prompt.trim(),
                }),
            },
        );

        const data = await response.json();

        if (!response.ok) {
            console.error("Pixazo error:", data);

            return res.status(response.status).json({
                error:
                    data?.message ||
                    data?.error ||
                    "Pixazo image generation failed.",
            });
        }

        console.log("Pixazo response:", data);

        const imageUrl =
            data?.output?.[0] ||
            data?.output ||
            data?.image_url ||
            data?.imageUrl ||
            data?.url;

        if (!imageUrl) {
            return res.status(500).json({
                error: "Pixazo returned no image URL.",
                response: data,
            });
        }

        res.json({
            success: true,
            imageUrl,
            prompt: prompt.trim(),
        });
    } catch (error) {
        console.error("Image generation error:", error);

        res.status(500).json({
            error: "Unable to connect to the image generation service.",
        });
    }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`AI SaaS server running on http://localhost:${PORT}`);
});