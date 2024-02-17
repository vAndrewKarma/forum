/*
Instead of installing the escape html package, i've decided to copy paste ( modify it a bit ) it into my common folder which i plan 
to publish it lately to npm so i can make use  of it.

Credits to all the contributors for https://github.com/component/escape-html
*/

const matchHtmlRegExp = /["'&<>]/

export default function escapeHtml(string) {
  const str = '' + string
  const match = matchHtmlRegExp.exec(str)

  if (!match) {
    return str
  }

  let escape: string
  let html = ''
  let index = 0
  let lastIndex = 0

  for (index = match.index; index < str.length; index++) {
    switch (str.charCodeAt(index)) {
      case 34: // "
        escape = '&quot;'
        break
      case 38: // &
        escape = '&amp;'
        break
      case 39: // '
        escape = '&#39;'
        break
      case 60: // <
        escape = '&lt;'
        break
      case 62: // >
        escape = '&gt;'
        break
      default:
        continue
    }

    if (lastIndex !== index) {
      html += str.substring(lastIndex, index)
    }

    lastIndex = index + 1
    html += escape
  }

  return lastIndex !== index ? html + str.substring(lastIndex, index) : html
}
