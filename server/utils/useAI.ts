import { Groq } from 'groq-sdk'
import postSchema from './postSchema.json'

export default function (apiKey: string): Array<any> {
  const client = new Groq({ apiKey })

  async function parseHtml (html: string) {
    const chatCompletion = await client.chat.completions.create({
      messages: [
        { role: 'system', content: `You are a converter from html to json. You will get html and only return the converted json no other text or content. If you don't find anything just return an empty array. Find in the html all articles and put them in an json array where each object follows this schema: ${postSchema}` },
        { role: 'user', content: html }
      ],
      model: 'llama-3.3-70b-versatile'
    })

    return JSON.parse(chatCompletion.choices[0].message.content)
  }

  return { parseHtml }
}
