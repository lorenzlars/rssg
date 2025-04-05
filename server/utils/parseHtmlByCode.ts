import vm from 'node:vm'
import { JSDOM } from 'jsdom'

export default async function (url: string, code: string) {
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

  return context.result
}

function parseHtml (html: string) {
  return new DOMParser().parseFromString(html, 'text/html').body.childNodes[0]
}
