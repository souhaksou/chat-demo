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
    console.log('a');
    console.log('b', import.meta.env.VITE_CHAT_MODEL);
    console.log('c');

    const messages = [{
      role: 'system',
      content: `You are an assistant who replies in Traditional Chinese using a friendly tone like a Taiwanese person.
                If the question involves programming, prioritize using JavaScript in your examples and explanations.
                If the response contains any math formulas, always write them using LaTeX syntax and wrap them in '$...$' for inline math or '$$...$$' for block math, so they can be rendered correctly in Markdown.
                `}, ...message];
    const res = await client.post(
      '/chat/completions',
      {
        model: `${import.meta.env.VITE_CHAT_MODEL}`,
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