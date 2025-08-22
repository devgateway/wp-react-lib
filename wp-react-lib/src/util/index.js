const useHash = process.env.VITE_REACT_APP_USE_HASH_LINKS === "true" || false;

const localReplaceLink = (url, locale) => {
  if (url) {
    if (!url.substr(url.indexOf("/wp") + 3).startsWith("/" + locale)) {
      return "/" + locale + url.substr(url.indexOf("/wp") + 3);
    }
    return url.substr(url.indexOf("/wp") + 3);
  }
  return "";
};

export const replaceLink = (url, locale) => {
  return localReplaceLink(url, locale)
}

export const replaceHTMLinks = (html, locale) => {
  //console.log("--------- replaceHTMLinks--------------")
  // console.log(process.env.REACT_APP_WP_HOSTS)

  let link;
  let regex = /href\s*=\s*(['"])(https?:\/\/.+?)\1/ig;

  let newHtml = html
  while ((link = regex.exec(html)) !== null) {
    let href = link[2]
    let newLink = localReplaceLink(href, locale)
    newHtml = newHtml.replaceAll(link[2], newLink)
  }
  return newHtml;
}

export const removePatternBrackets = (html) => {
  const bracketReplacement = `###${Math.random()}###`; // A unique string to mark replacements
  const regex = new RegExp(`\\[${bracketReplacement}.*?]`, 'ig'); // No lookbehind, matches pattern within square brackets
  if (html) {
    return html
      .replaceAll('[:', `[${bracketReplacement}`) // Use square brackets to match regex pattern
      .replaceAll(regex, '') // Remove entire pattern inside square brackets
      .replaceAll(`${bracketReplacement}`, ''); // Clean up any remaining placeholders
  } else {
    return null;
  }
};

export default { replaceHTMLinks, replaceLink }
