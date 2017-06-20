// @flow

import { fetchPage } from './pageFetcher';

export function collectPages(url: string) {
    return new Promise((resolve, reject) => {
        if (Object.prototype.toString.call(url) !== "[object String]") {
            return reject('Variable passed to collectPages is not a string');
        } else {
            return resolve(fetchPage(url)
                .then((page) => {
                    const links = Object.values(page.getElementsByTagName('a')).map((object) => {
                        return object.href;
                    });
                    const pageLinks = links.filter(isInspectionPageLink);
                    console.log(pageLinks);
                    return pageLinks;
                }));
        }
    })
}

export function isInspectionPageLink(link: string) {
    return link.indexOf('search.cfm?start=') !== -1;
}
