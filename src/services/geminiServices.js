export const getAIResponse = async (userInput, language) => {
  const prompt = `You are a fun and friendly coding tutor for 10-year-old kids. 

  Explain the method "${userInput}" in ${language} using **very simple words**.
  
  Please include these sections in markdown format:
  
  Real Example  
  Give one real-world example a kid can understand (like toys, games, animals, or food).
  
  Explanation  
  Say what the method does in easy words. Make it sound fun like a superhero or helper!
  
  Code  
  Show a very easy code example. Use things like numbers, candies, or colors so it's fun to read.
  
  Task  
  Give a small and easy challenge the kid can try using the method.
  
  use  
  List 4 or 5 simple real-life things or places where we use this method.
  
  Make it short, fun, and super simple. Format the answer in markdown.
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
  