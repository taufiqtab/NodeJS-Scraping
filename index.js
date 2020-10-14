'use strict';

require('colors');
const request = require('request');
const cheerio = require('cheerio');

let url = 'https://jadwalsholat.org/adzan/monthly.php?id=307';

request(url, function (err, res, body) {
    if (err && res.statusCode !== 200) throw err;

    let $ = cheerio.load(body);
    $('table.table_adzan tr[align=center]').each((i, value) => {
        $(value).find('td').each((j, data) => {
            if ($(value).attr('class') === 'table_highlight')
                return process.stdout.write($(data).text().red + '\t');
            return process.stdout.write($(data).text() + '\t');
        });
        process.stdout.write('\n');
    });
});