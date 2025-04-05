import vm from 'vm'

export default async function (url: string, code: string) {
  const html = await $fetch(url)

  const sandbox = {
    items: html,
    console
  }

  const script = new vm.Script(code)

  const context = vm.createContext(sandbox)

  try {
    const result = script.runInContext(context)

    return result.map((post: any) => ({ ...post }))
  } catch (e) {
    console.log(e)
  }
}

function parseHtml (html: string) {
  return new DOMParser().parseFromString(html, 'text/html').body.childNodes[0]
}
