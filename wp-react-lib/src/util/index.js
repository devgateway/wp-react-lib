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
    
    // Fix malformed URLs where locale is concatenated with domain (e.g., /enlocalhost/...)
    // This handles cases where the URL replacement went wrong
    // Pattern matches: /enlocalhost/... or /en<any-domain>/...
    const localeDomainConcatenationPattern = new RegExp(`(href\\s*=\\s*['"])(/${escapeRegex(locale)})([^/]+)(/.*?)(['"])`, 'gi');
    newHtml = newHtml.replace(localeDomainConcatenationPattern, (match, prefix, localePart, domainPart, pathPart, suffix) => {
        // Reconstruct the correct URL: /locale/path (removing the domain part)
        let newLink;
        if (useHash) {
            newLink = '#' + locale + pathPart;
        } else {
            newLink = '/' + locale + pathPart;
        }
        return prefix + newLink + suffix;
    });
    
    // Handle relative URLs that start with /wp/ but don't have locale prefix
    // This ensures relative WordPress URLs get the locale prefix added
    // Also handles cases where WordPress embeds locale in path like /wp/fr/news-post/
    const relativeWpPattern = /href\s*=\s*(['"])(\/wp\/[^'"]+)\1/gi;
    newHtml = newHtml.replace(relativeWpPattern, (match, quote, path) => {
        // Check if path already has locale prefix at the start (e.g., /fr/wp/...)
        if (path.startsWith(`/${locale}/`) || path.match(new RegExp(`^/${locale}[^/]`))) {
            return match; // Already has locale prefix, don't modify
        }
        
        // Check if WordPress embedded locale in path like /wp/fr/news-post/
        // Match pattern: /wp/{locale}/... where locale is 2-3 letter code
        const wpLocalePattern = /^\/wp\/([a-z]{2,3})(\/.*)$/i;
        const wpLocaleMatch = path.match(wpLocalePattern);
        
        if (wpLocaleMatch) {
            const embeddedLocale = wpLocaleMatch[1];
            const restOfPath = wpLocaleMatch[2];
            // If embedded locale matches current locale, reconstruct without duplicate
            if (embeddedLocale === locale) {
                let newLink;
                if (useHash) {
                    newLink = '#' + locale + '/wp' + restOfPath;
                } else {
                    newLink = '/' + locale + '/wp' + restOfPath;
                }
                return `href=${quote}${newLink}${quote}`;
            } else {
                // Different locale embedded, use current locale instead
                let newLink;
                if (useHash) {
                    newLink = '#' + locale + '/wp' + restOfPath;
                } else {
                    newLink = '/' + locale + '/wp' + restOfPath;
                }
                return `href=${quote}${newLink}${quote}`;
            }
        }
        
        // No locale in path, add it
        let newLink;
        if (useHash) {
            newLink = '#' + locale + path;
        } else {
            newLink = '/' + locale + path;
        }
        return `href=${quote}${newLink}${quote}`;
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
