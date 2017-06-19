// @flow

import { fetchPage } from './pageFetcher';

export function collectPages(url: string) {
    return new Promise((resolve, reject) => {
        if (Object.prototype.toString.call(url) !== "[object String]") {
            return reject('Variable passed to collectPages is not a string');
        } else {
            return resolve(fetchPage(url)
                .then((page) => {
                    const links = Object.values(page.getElementsByTagName('a'));
                    const pageLinks = links.filter(filterLinks).map((link)=>{
                        return link.href;
                    });
                    return pageLinks;
                }));

            function filterLinks(link){
                return link.href.indexOf('search.cfm?start=') !== -1;
            }
        }
    })
}
