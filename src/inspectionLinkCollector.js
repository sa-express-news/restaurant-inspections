// @flow

import { fetchPage } from './pageFetcher';
import { isInspectionPageLink } from './inspectionPageCollector';

export function collectInspectionLinks(pages: Array < string > ) {
    return new Promise((resolve, reject) => {
        if (!Array.isArray(pages)) {
            return reject('Variable passed to collectInspectionLinks is not an array');
        } else if (!pages.every(isString)) {
            return reject('Array passed to collectInspectionLinks must contain only strings');
        } else if (!pages.every(isInspectionPageLink)) {
            return reject('Strings/links passed to collectInspectionLinks are not search links');
        } else {
            return resolve(fetchPage('http://tx.healthinspections.us/san%20antonio/search.cfm?start=1&1=1&sd=05/21/2017&ed=06/20/2017&kw1=&kw2=&kw3=&rel1=L.licenseName&rel2=L.licenseName&rel3=L.licenseName&zc=&dtRng=YES&pre=similar&smoking=ANY')
                .then((page) => {
                    const links = Object.values(page.getElementsByTagName('a')).map((object) => {
                        return object.href;
                    });
                    const inspectionLinks = deduplicateArray(links.filter(isInspectionLink));
                    return inspectionLinks;
                }));
        }
    });
}

export function isString(item: string) {
    return Object.prototype.toString.call(item) === "[object String]";
}

export function isInspectionLink(link: string) {
    return link.indexOf('http://tx.healthinspections.us/san%20antonio/estab.cfm?') !== -1;
}

export function deduplicateArray(array: Array < any > ) {
    if (!Array.isArray(array)) {
        throw Error('variable passed to deduplicateArray is not an array');
    } else {
        let newArray = [];
        const set = new Set(array);
        for (let item of set) newArray.push(item);
        return newArray;
    }

}
