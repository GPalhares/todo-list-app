import axios from 'axios';

const API_URL = 'https://api.openai.com/v1/chat/completions';

const API_KEY = import.meta.env.VITE_API_KEY_OPENAI;

export const generateTags = async (description, oldTags = []) => {
  try {
    const oldTagsString =
      oldTags.length > 0
        ? ` que não incluam as tags ${oldTags.join(', ')}`
        : '';

    const response = await axios.post(
      API_URL,
      {
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'user',
            content: `Gere 3 tags no formato '#tag1 #tag2 #tag3' que façam sentido com a seguinte tarefa: ${description}${oldTagsString}`,
          },
        ],
        max_tokens: 50,
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const tags = response.data.choices[0].message.content
      .trim()
      .split(' ')
      .map((tag) => tag.trim());

    // Garantir que não tenha mais de 3 tags
    return tags.slice(0, 3);
  } catch (error) {
    console.error('Erro ao gerar tags:', error);
    return [];
  }
};
