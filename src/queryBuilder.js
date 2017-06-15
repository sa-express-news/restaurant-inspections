//@flow

//QUERYBUILDER.JS
//PARAMS - today's date
//Reformat today as 06/05/2017
//Create 7 days ago formatted same
//RETURNS query string

//Sample Query
//http://tx.healthinspections.us/san%20antonio/search.cfm?1=1&sd=06/08/2017&ed=06/15/2017&kw1=&kw2=&kw3=&rel1=L.licenseName&rel2=L.licenseName&rel3=L.licenseName&zc=&dtRng=YES&pre=similar&smoking=ANY

export default {
    formatDate: function(date: Date) {
        return new Promise((resolve, reject) => {
            if (!Object.prototype.toString.call(date) === "[object Date]") {
                return reject('variable passed to queryBuilder is not a date');
            }
            return resolve('hi there');
        });
    },
    makeNumberTwoDigits: function(num: number) {
        return new Promise((resolve, reject) => {
            if (isNaN(num)) {
                return reject('variable passed to makeNumberTwoDigits is not a number');
            }

            if (num < 1 || num > 12) {
                return reject('variable passed to makeNumberTwoDigits is not a valid month number');
            }
            return resolve(num);
        });
    }
};
