const useHash = process.env.VITE_REACT_APP_USE_HASH_LINKS;

// Escape special regex characters in domain names
const escapeRegex = (string) => {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export const replaceLink = (url, locale) => {
    if (!url || !locale) return url;
    //console.log("--------- replaceLink--------------")
    //console.log(process.env.REACT_APP_WP_HOSTS)
    const replacementTarget = process.env.VITE_REACT_APP_WP_HOSTS?.split(",").map(d => escapeRegex(d.trim())) || []
    if (replacementTarget.length === 0) return url;
    
    // Match protocol and domain, capture everything after (path, query, fragment)
    let all = new RegExp("^(https?://)(" + replacementTarget.join('|') + ")(.*)$", "i");
    
    if (useHash) {
        const match = url.match(all);
        if (match) {
            const path = match[3] || '/';
            return '#' + locale + path;
        }
    } else {
        const match = url.match(all);
        if (match) {
            const path = match[3] || '/';
            return '/' + locale + path;
        }
    }
    return url;
}

export const replaceHTMLinks = (html, locale) => {
    if (!html || !locale) return html;
    //console.log("--------- replaceHTMLinks--------------")
    // console.log(process.env.REACT_APP_WP_HOSTS)
    const replacementTarget = process.env.VITE_REACT_APP_WP_HOSTS?.split(",").map(d => escapeRegex(d.trim())) || []
    if (replacementTarget.length === 0) return html;
    
    // Match protocol and domain, capture everything after (path, query, fragment)
    let all = new RegExp("^(https?://)(" + replacementTarget.join('|') + ")(.*)$", "i");

    let link;
    let regex = /href\s*=\s*(['"])(https?:\/\/.+?)\1/ig;

    let newHtml = html
    const processedLinks = new Map(); // Track processed URLs to avoid duplicate processing
    
    // First pass: collect all URLs that need to be replaced
    while ((link = regex.exec(html)) !== null) {
        let href = link[2]
        // Skip if we've already processed this URL
        if (processedLinks.has(href)) {
            continue;
        }
        
        const match = href.match(all);
        if (match) {
            const path = match[3] || '/';
            let newLink;
            if (useHash) {
                newLink = '#' + locale + path;
            } else {
                newLink = '/' + locale + path;
            }
            processedLinks.set(href, newLink);
        }
    }
    
    // Second pass: replace all occurrences of processed URLs within href attributes
    processedLinks.forEach((newLink, oldLink) => {
        // Match href attributes containing the old URL and replace just the URL part
        const hrefPattern = new RegExp(`(href\\s*=\\s*['"])${escapeRegex(oldLink)}(['"])`, 'gi');
        newHtml = newHtml.replace(hrefPattern, `$1${newLink}$2`);
    });
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
