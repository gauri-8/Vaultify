export const askVault = async (req, res) => {
  const { prompt } = req.body;

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "HTTP-Referer": "http://localhost:5173/", // ✅ important
        "X-Title": "Vaultify AskVault"   

      },
      body: JSON.stringify({
        model: "mistralai/mistral-7b-instruct:free", // ✅ working July 2025
        messages: [{ role: "user", content: prompt }],
        max_tokens: 512
      })
    });

    const data = await response.json();
    console.log("🧪 Debug:", JSON.stringify(data, null, 2));

    const reply = data?.choices?.[0]?.message?.content;

    if (!reply) {
      return res.status(500).json({ error: "No response from AI", debug: data });
    }

    res.status(200).json({ reply });

  } catch (error) {
    console.error("❌ OpenRouter API Error:", error.message);
    res.status(500).json({ error: "OpenRouter request failed" });
  }
};
