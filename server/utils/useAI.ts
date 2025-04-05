import { Groq } from 'groq-sdk'
import Ajv from 'ajv'
import postSchema from './postSchema.json'
import tryJsonParse from '~/server/utils/tryJsonParse'

export default function (apiKey: string) {
  const client = new Groq({ apiKey })
  const ajv = new Ajv()
  const validate = ajv.compile(postSchema)

  async function parseHtml (html: string) {
    const chatCompletion = await client.chat.completions.create({
      messages: [
        { role: 'system', content: `You are a converter from html to json. You will get html and only return the converted json no other text or content. If you don't find anything just return an empty array. Find in the html all articles and put them in an json array where each object follows this schema: ${postSchema}` },
        { role: 'user', content: html }
      ],
      model: 'llama-3.3-70b-versatile'
    })

    const result = chatCompletion.choices[0].message.content

    if (!result) {
      console.warn('No result from AI')
      return []
    }

    const jsonResponse = tryJsonParse<any[]>(result)

    if (!jsonResponse || !Array.isArray(jsonResponse)) {
      console.warn('AI returned invalid JSON')
      return []
    }

    for (const json of jsonResponse) {
      const valid = validate(json)

      if (!valid) {
        console.warn('AI returned data which are not matching the expected schema')
        return []
      }
    }

    return jsonResponse
  }

  return { parseHtml }
}
