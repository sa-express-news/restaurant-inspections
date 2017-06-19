// //@flow

// //QUERYBUILDER.JS
// //PARAMS - a date
// //Reformat date as 06/05/2017
// //Create 7 days ago formatted same
// //RETURNS query string

// //Sample Query
// //http://tx.healthinspections.us/san%20antonio/search.cfm?1=1&sd=06/08/2017&ed=06/15/2017&kw1=&kw2=&kw3=&rel1=L.licenseName&rel2=L.licenseName&rel3=L.licenseName&zc=&dtRng=YES&pre=similar&smoking=ANY


export function formatDate(date: Date) {

    return new Promise(function(resolve, reject) {
        if (!Object.prototype.toString.call(date) === "[object Date]") {
            return reject('variable passed to queryBuilder is not a date');
        } else {
            const endDate = convertDateToMDY(date);
            const startDate = convertDateToMDY(getDateAWeekPrior(date));
            const url = `http://tx.healthinspections.us/san%20antonio/search.cfm?1=1&sd=${startDate}&ed=${endDate}&kw1=&kw2=&kw3=&rel1=L.licenseName&rel2=L.licenseName&rel3=L.licenseName&zc=&dtRng=YES&pre=similar&smoking=ANY`;
            return resolve(url);
        }
    });
}

/**
 * Convert a date to a mm/dd/yyyy format string.
 * @param {Date} date - The date to convert.
 * @return {string} Formatted string.
 */
export function convertDateToMDY(date: Date) {
    if (Object.prototype.toString.call(date) !== "[object Date]") {
        throw Error('variable passed to convertDateToMDY is not a date');
    } else {
        let startDateMonth = makeNumberTwoDigitString((date.getMonth() + 1));
        let startDateDay = makeNumberTwoDigitString(date.getDate());
        let startDateYear = date.getFullYear().toString();

        return `${startDateMonth}/${startDateDay}/${startDateYear}`;
    }
}

/**
 * Convert a number 1-12 to a two-digit string representing a month.
 * @param {number} num - The number to convert to a string.
 * @return {string} Two-digit string.
 */
export function makeNumberTwoDigitString(num: number) {
    if (isNaN(num)) {
        throw Error('variable passed to makeNumberTwoDigits is not a number');
    } else if (num < 1 || num > 31) {
        throw Error('variable passed to makeNumberTwoDigits is not a valid month/day number');
    } else if (num < 10) {
        num = '0' + num.toString();
        return num;
    }

    return num.toString();
}

/**
 * Return a date 7 days prior to the one given.
 * @param {Date} date - The original date.
 * @return {Date} The date one week prior to the parameter.
 */
export function getDateAWeekPrior(date: Date) {
    if (Object.prototype.toString.call(date) !== "[object Date]") {
        throw Error('variable passed to convertDateToMDY is not a date');
    } else {
        const millisecondsInAWeek = 604800000;
        const weekAgo = date.getTime() - millisecondsInAWeek;
        const newDate = new Date();
        newDate.setTime(weekAgo);
        return newDate;
    }
}
