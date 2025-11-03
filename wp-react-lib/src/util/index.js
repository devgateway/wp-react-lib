const useHash = process.env.VITE_REACT_APP_USE_HASH_LINKS;


export const replaceLink = (url, locale) => {
    //console.log("--------- replaceLink--------------")
    //console.log(process.env.REACT_APP_WP_HOSTS)
    const replacementTarget = process.env.VITE_REACT_APP_WP_HOSTS.split(",")
    let all = new RegExp("^(http|https)://(" + replacementTarget.join('|') + ")", "ig");
    if (useHash && url) {
        return url.replaceAll(all, "#" + locale)
    } else if (url) {
        return url.replaceAll(all, "/" + locale)
    }
}

export const replaceHTMLinks = (html, locale) => {
    //console.log("--------- replaceHTMLinks--------------")
    // console.log(process.env.REACT_APP_WP_HOSTS)
    const replacementTarget = process.env.VITE_REACT_APP_WP_HOSTS?.split(",") || []
    let all = new RegExp("^(http|https)://(" + replacementTarget.join('|') + ")", "ig");

    let link;
    let regex = /href\s*=\s*(['"])(https?:\/\/.+?)\1/ig;

    let newHtml = html
    while ((link = regex.exec(html)) !== null) {
        let href = link[2]
        let newLink
        if (useHash) {
            newLink = href.replace(all, '#' + locale) //TODO:fix it!
        } else {
            newLink = href.replace(all, '' + locale) //TODO:fix it!
        }
        newHtml = newHtml.replaceAll(link[2], newLink)
    }
    if (useHash) {
        let anchor = /href="#([^"]*)"/ig;
        let re2 = new RegExp(anchor, "i");
        while ((link = anchor.exec(html)) !== null) {
            let href = link[0]
            let newLink = href.replace(re2, 'href="javascript:document.getElementById(\'' + link[1] + '\').scrollIntoView({block: \'start\', behavior: \'smooth\'})"')
            newHtml = newHtml.replaceAll(link[0], newLink)
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

export default {replaceHTMLinks, replaceLink}
