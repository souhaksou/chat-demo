import axios from "axios";

const client = axios.create({
  baseURL: 'https://chatapi.akash.network/api/v1',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${import.meta.env.VITE_CHAT_KEY}`
  }
});

const chat = async (message) => {
  try {
    const messages = [{
      role: 'system',
      content: '請用繁體中文搭配台灣人的語氣回答，如果是程式語言相關問題請優先用javascript回答。'
    }, ...message];
    const res = await client.post(
      '/chat/completions',
      {
        model: "DeepSeek-R1",
        messages: messages
      }
    );
    if (res.status === 200) {
      const { role, content } = res.data.choices[0].message;
      const result = {
        data: [{ role, content }],
        success: true
      };
      return result;
    }
    else {
      const err = new Error("chat error");
      throw err;
    }
  } catch (error) {
    console.error('Error:', error);
    const result = {
      data: [],
      success: false
    };
    return result;
  }
}

export { chat };