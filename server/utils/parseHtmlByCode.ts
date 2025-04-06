import vm from 'node:vm'
import { JSDOM } from 'jsdom'
import Ajv from 'ajv'
import postSchema from './postSchema.json'

export default async function (url: string, code: string) {
  const ajv = new Ajv()
  const validate = ajv.compile(postSchema)
  const html = await $fetch<string>(url)
  const dom = new JSDOM(html)
  const document = dom.window.document

  // TODO: run vm in a separate thread
  // TODO: build a class for the vm sandbox
  const context = vm.createContext({ document })
  const script = new vm.Script(`
    result = (function(document) { ${code} })(document)
  `)

  script.runInContext(context, { timeout: 1_000 })

  if (!context.result || !Array.isArray(context.result)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid result',
      message: 'The result is not an array'
    })
  }

  for (const json of context.result) {
    const valid = validate(json)

    if (!valid) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid result',
        message: 'The result is not valid'
      })
    }
  }

  return context.result
}
