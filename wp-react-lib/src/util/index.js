const localReplaceLink = (url, locale) => {
  if (!url) {
    return "";
  }
  const safeLocale = locale || "en";

  try {
    let pathname = url;

    // If absolute URL, extract pathname and ignore origin
    if (/^https?:\/\//i.test(url)) {
      const parsed = new URL(url);
      pathname = parsed.pathname + (parsed.search || "") + (parsed.hash || "");
    }

    if (!pathname.startsWith("/wp/")) {
      return url; // Not a WordPress path, leave unchanged
    }
    //ensuring access to media library files
    if (pathname.startsWith("/wp/wp-content")){
      return url
    }

    const afterWp = pathname.slice(3); // remove '/wp'

    if (!afterWp.startsWith("/" + safeLocale)) {
      return "/" + safeLocale + afterWp;
    }

    return afterWp;
  } catch (e) {
    console.error("Error parsing URL:", e);
    return url;
  }
};

export const replaceLink = (url, locale) => {
  if (!url) {
    return "";
  }
  return localReplaceLink(url, locale);
}

export const replaceHTMLinks = (html, locale) => {
  debugger;
  //console.log("--------- replaceHTMLinks--------------")
  // console.log(process.env.REACT_APP_WP_HOSTS)

  let link;
  // Match both absolute (http/https) and relative WP links in a single pass
  let linkRegex = /href\s*=\s*(['"])(https?:\/\/.*?|\/wp\/.*?)\1/ig;

  let newHtml = html
  while ((link = linkRegex.exec(html)) !== null) {
    let href = link[2]
    let newLink = localReplaceLink(href, locale)
    if (newLink !== href) {
      newHtml = newHtml.replaceAll(href, newLink)
    }
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
