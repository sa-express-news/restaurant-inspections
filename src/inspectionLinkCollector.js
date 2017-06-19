// @flow

import { fetchPage } from './pageFetcher';

export function collectInspectionLinks(pages: Array < string > ) {
    return new Promise((resolve, reject) => {
        if (!Array.isArray(pages)) {
            return reject('Variable passed to collectInspectionLinks is not an array');
        } else if (!pages.every(isString)) {
            return reject('Array passed to collectInspectionLinks must contain only strings');
        }

        // const test = pages.every(isString);
        // if (!test) {
        //    
        // } else {
        //     return resolve('hi');
        // }
        return resolve('hi');

        function isString(item) {
            return Object.prototype.toString.call(item) === "[object String]";
        }
        //     if (Object.prototype.toString.call(url) !== "[object String]") {
        //         return reject('Variable passed to collectPages is not a string');
        //     } else {
        //         return resolve(fetchPage(url)
        //             .then((page) => {
        //                 const links = Object.values(page.getElementsByTagName('a'));
        //                 const pageLinks = links.filter(filterLinks).map((link)=>{
        //                     return link.href;
        //                 });
        //                 return pageLinks;
        //             }));

        //         function filterLinks(link){
        //             return link.href.indexOf('search.cfm?start=') !== -1;
        //         }
        //     }


    });


}
