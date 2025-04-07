export const getAIResponse = async (userInput, language) => {
  const prompt = `You're a fun and friendly coding tutor for 10-year-old kids.

  Explain the method "${userInput}" in ${language} using **very simple words**.
  
  Provide multiple answers for each of the following sections in markdown format:
  
  ### Real Example
  Give 2-3 real-world examples a kid can understand (toys, games, animals, food).
  
  ### Explanation
  Give 1 clear and fun explanation like a superhero/helper.
  
  ### Code
  Give 1 beginner-friendly code example using fun concepts (candies, toys, colors).
  
  ### Task
  Give 2-3 different challenges a kid can try.
  
  ### Use
  Give 3-4 different real-life examples where this method is used.
  
  Keep it fun, short, and kid-friendly. Format everything clearly in markdown with section headers.
  `;
  
    
    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [{ text: prompt }],
              },
            ],
          }),
        }
      );
  
      const data = await res.json();
      return data?.candidates?.[0]?.content?.parts?.[0]?.text || "⚠️ No response from Gemini.";
    } catch (error) {
      return `❌ Error: ${error.message}`;
    }
  };
  