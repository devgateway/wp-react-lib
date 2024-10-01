const useHash = process.env.REACT_APP_USE_HASH_LINKS;


export const replaceLink = (url, locale) => {
    //console.log("--------- replaceLink--------------")
    //console.log(process.env.REACT_APP_WP_HOSTS)
    const replacementTarget = process.env.REACT_APP_WP_HOSTS.split(",")
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
    const replacementTarget = process.env.REACT_APP_WP_HOSTS.split(",")
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
    const bracketReplacement = `###${Math.random()}###`; //this is a workaround to skip an issue with brackets in regex and tag it for replacement
    const regex = new RegExp(`(?<=${bracketReplacement}).*?(?=])`, 'ig');
    if (html) {
        return html.replaceAll('[:', bracketReplacement).replaceAll(regex, '').replaceAll(`${bracketReplacement}]`, '');
    } else {
        return null;
    }
}

export default {replaceHTMLinks, replaceLink}
