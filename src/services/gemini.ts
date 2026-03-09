import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY;

export const ai = new GoogleGenAI({ apiKey: apiKey || "" });

export const getGrantConsultantResponse = async (message: string, history: { role: string; content: string }[]) => {
  const model = "gemini-3-flash-preview";
  
  const systemInstruction = `Ты — эксперт по поступлению на зарубежные гранты для студентов из Казахстана. 
Твоя цель — помогать пользователям выбирать программы, писать мотивационные письма и понимать процесс подачи документов.
Ты знаешь о таких программах как:
- Болашак (Казахстан)
- DAAD (Германия)
- Chevening (Великобритания)
- Fulbright (США)
- Stipendium Hungaricum (Венгрия)
- Гранты Турции (Türkiye Bursları)
- Гранты Китая (CSC)
- И многие другие.

Отвечай на русском языке. Будь вежливым, профессиональным и вдохновляющим. 
Если пользователь спрашивает про конкретную страну, дай краткий обзор популярных грантов там.
Если пользователь просит проверить мотивационное письмо, дай конструктивную критику.
Всегда учитывай специфику Казахстана (например, необходимость апостилирования документов, сертификаты IELTS/TOEFL, ЕНТ не всегда нужно для зарубежья и т.д.).`;

  try {
    // Map history to Gemini format (user/model)
    // Filter out messages to ensure it starts with a user message
    const geminiHistory = [];
    let foundFirstUser = false;
    
    for (const msg of history) {
      if (msg.role === 'user') foundFirstUser = true;
      if (foundFirstUser) {
        geminiHistory.push({
          role: msg.role === 'user' ? 'user' : 'model',
          parts: [{ text: msg.content }]
        });
      }
    }

    const chat = ai.chats.create({
      model,
      history: geminiHistory,
      config: {
        systemInstruction,
      },
    });

    const response = await chat.sendMessage({ message });
    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Извините, произошла ошибка при подключении к ИИ-консультанту. Пожалуйста, попробуйте позже.";
  }
};
