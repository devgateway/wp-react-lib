export const replaceLink = (url, locale) => {
    let localhost = new RegExp("^(http|https)://localhost", "ig");
    let prod = new RegExp("^(http|https)://" + "wp.tobacco.dgstg.org", "ig");
    return url.replaceAll(localhost, "#" + locale).replaceAll(prod, "#" + locale)
}

export const replaceHTMLinks = (html) => {
    let link;
    let regex = /href\s*=\s*(['"])(https?:\/\/.+?)\1/ig;
    if (document.location.hostname === 'localhost') {
        var re = new RegExp("^(http|https)://localhost", "i");
    } else {
        //replace wp.someurl
        var re = new RegExp("^(http|https)://" + "wp." + document.location.hostname, "i");
    }
    let newHtml = html
    while ((link = regex.exec(html)) !== null) {
        let href = link[2]
        let newLink = href.replace(re, '#en')
        newHtml = html.replaceAll(link[2], newLink)
    }

    let anchor = /href="#([^"]*)"/ig;
    let re2 = new RegExp(anchor, "i");
    while ((link = anchor.exec(html)) !== null) {
        let href = link[0]
        let newLink = href.replace(re2, 'href="javascript:document.getElementById(\'' + link[1] + '\').scrollIntoView({block: \'start\', behavior: \'smooth\'})"')
        newHtml = newHtml.replaceAll(link[0], newLink)
    }

    return newHtml;
}


export default {}