const replacementTarget = [
    "localhost",
    "wp.tobacco.dgstg.org",
    "wordpress-za.tobacco.dgstg.org",
    "wordpress-za.tobaccocontroldata.org"
]
let all = new RegExp("^(http|https)://(" + replacementTarget.join('|') + ")", "ig");

export const replaceLink = (url, locale) => {
    return url.replaceAll(all, "#" + locale)
}

export const replaceHTMLinks = (html) => {

    debugger;
    let link;
    let regex = /href\s*=\s*(['"])(https?:\/\/.+?)\1/ig;

    let newHtml = html
    while ((link = regex.exec(html)) !== null) {
        let href = link[2]
        let newLink = href.replace(all, '#en') //TODO:fix it!
        newHtml = newHtml.replaceAll(link[2], newLink)
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