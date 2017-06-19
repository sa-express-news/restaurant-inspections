// @flow
'use strict';

// import { convertDateToMDY } from './queryBuilder';
import { fetchPage } from './pageFetcher';

// import queryBuilder from './queryBuilder';

// queryBuilder.formatDate(new Date())
// 	.then((result)=>{
// 		console.log(result);
// 	});

// const jsdom = require("jsdom");
// const { JSDOM } = jsdom;

// JSDOM.fromURL('http://example.org').then(dom => {
//     const page = dom.window.document;

//     // console.log(page instanceof HTMLDocument);

//     console.log(Object.prototype.toString.call(page));

//     //RETURNS [object Document]
// })

// fetchPage('https://example.org')
//     .then(page => {
//         // console.log(page.getElementsByTagName('h1')[0].textContent);
//         console.log(typeof page === 'object');
//     });



//Generate today's date

//QUERYBUILDER.JS
//PARAMS - a date
//Reformat today as 06/05/2017
//Create 7 days ago formatted same
//RETURNS query string

//INSPECTIONPAGECOLLECTOR.JS
//PARAMS = query string
//Ping first page using date string
//Collect every link with a 'search.cfm?start=' parameter
//Push each link to an array
//RETURNS array of page links

//INSPECTIONCOLLECTOR.JS
//PARAMS = array of page links
//Map array of page links >
//Collect every search.cfm link to an inspection
//Push every link to an array
//RETURNS array of links to individual inspections

//INSPECTIONPARSER.JS
//PARAMS = array of links
//Filter array of links >
//If score < 90
//Collect name, score, inspection date, address, violations
//Pass to 
//INSPECTIONWRITER.JS
//PARAMS = score, info
//if score < 90
//Write info to the week's list of bad inspections
//If score = 100
//Write info to the week's list of perfect inspections
//Write to file for bad inspections
//If score >= 90 < 100
//Do nothing
//If score = 100
//Collect name, score, inspection date, address, violations
//Pass to
//INSPECTIONWRITER.JS
//RETURNS locations of files

//LISTMAILER.JS
//PARAMS = locations of log files
//Email files to Rebecca




// const func = (string: string) => {
//     console.log(string);
// }

// const arr = [1, 2, 3, 4];

// const mapper = (arr: Array < number > ) => {
//     return arr.map((item, index) => {
//         console.log(item, index);
//     });
// }

// mapper(arr);

// fetch('kiafarhang.com/dogs')
//     .then((response) => response.json())
//     .then((data) => {
//         console.log(data);
//     });


// const jsdom = require("jsdom");
// const { JSDOM } = jsdom;


// const dom = new JSDOM(``, {
//   url: "https://kiafarhang.com/",
//   contentType: "text/html",
// });

// const page = dom.window.document;

// console.log(page.getElementsByTagName('p'));
