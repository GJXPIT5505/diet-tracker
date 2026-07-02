// Using direct fetch to Gemini REST API for maximum edge compatibility

const GEMINI_API_VERSION = "v1beta";
const MODEL_CHAT = "gemini-2.0-flash";
const MODEL_VISION = "gemini-2.0-flash"; 

export async function chatWithDietitian(messages: { role: "user" | "model"; parts: { text: string }[] }[], apiKey: string) {
  const url = `https://generativelanguage.googleapis.com/${GEMINI_API_VERSION}/models/${MODEL_CHAT}:generateContent?key=${apiKey}`;
  
  const systemInstruction = {
    parts: [{
      text: "Anda adalah seorang asisten diet dan nutrisi yang suportif, empatik, dan berbasis ilmu pengetahuan (science-based). " +
            "Tujuan utama Anda adalah membantu pengguna mencapai gaya hidup sehat dan target berat badan secara berkelanjutan. " +
            "SELALU dorong pola diet sehat, seimbang, dan realistis. " +
            "TIDAK PERNAH menyarankan diet ekstrem, defisit kalori berlebihan (di bawah 1200 kkal untuk wanita atau 1500 kkal untuk pria), " +
            "atau pola makan yang berisiko pada kesehatan fisik dan mental. " +
            "Gunakan bahasa yang tidak menghakimi (non-judgmental) dan memotivasi."
    }]
  };

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      systemInstruction,
      contents: messages,
      generationConfig: {
        temperature: 0.7,
      }
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Gemini API Error: ${response.status} - ${errorText}`);
  }

  const data = await response.json();
  return data;
}

export async function estimateCaloriesFromImage(base64Image: string, mimeType: string, apiKey: string) {
  const url = `https://generativelanguage.googleapis.com/${GEMINI_API_VERSION}/models/${MODEL_VISION}:generateContent?key=${apiKey}`;
  
  const prompt = "Analisis gambar makanan ini. Berikan estimasi rincian gizi dalam format JSON murni tanpa markdown wrapper (seperti ```json): {\"name\": \"Nama Makanan\", \"calories\": 0, \"protein\": 0, \"carbs\": 0, \"fat\": 0}. Berikan estimasi terbaik Anda meskipun hanya pendekatan. Jika tidak ada makanan di gambar, kembalikan objek dengan nilai 0 dan nama 'Bukan makanan'.";

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [
            { text: prompt },
            {
              inlineData: {
                mimeType: mimeType,
                data: base64Image
              }
            }
          ]
        }
      ]
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Gemini Vision API Error: ${response.status} - ${errorText}`);
  }

  const data = await response.json();
  return data;
}
