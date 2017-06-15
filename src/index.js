// @flow
'use strict';

import queryBuilder from './queryBuilder';

queryBuilder.makeNumberTwoDigits(6)
    .then((result) => {
        console.log(typeof result);
    });

//Generate today's date

//QUERYBUILDER.JS
//PARAMS - today's date
//Reformat today as 06/05/2017
//Create 7 days ago formatted same
//RETURNS query string

//INSPECTIONCOLLECTOR.JS
//PARAMS = query string
//Ping first page using date string
//Collect every search.cfm link to an inspection
//Push every link to an array
//Ping the next page
//Collect every link to inspection, etc.
//Ping pages until you get a blank page
//RETURNS array of links

//INSPECTIONPARSER.JS
//PARAMS = array of links
//Map array of links >
//Parse score
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
