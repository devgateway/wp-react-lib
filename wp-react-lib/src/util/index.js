const useHash = process.env.REACT_APP_USE_HASH_LINKS.toLowerCase() === "true"


export const replaceLink = (url, locale) => {
    const replacementTarget = process.env.REACT_APP_WP_HOSTS.split(",")
    let all = new RegExp("^(http|https)://(" + replacementTarget.join('|') + ")", "ig");
    if (useHash) {
        return url.replaceAll(all, "#" + locale)
    } else {
        return url.replaceAll(all, "" + locale)
    }
}

export const replaceHTMLinks = (html, locale) => {
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


export default {replaceHTMLinks, replaceLink}