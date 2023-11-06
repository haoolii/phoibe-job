import { parseContent } from './utils';

const API = "https://165.npa.gov.tw/api/article/subclass/3";

import db from './db';

const main = async () => {
    const response = await fetch(API);
    const json = await response.json();
    const data = JSON.parse(JSON.stringify(json)).slice(5);
    for(let i = 0; i < data.length; i++) {
        const target = data[i];
        const websites = parseContent(target.content)
        const pure_websites = websites.filter(website => website.websiteName !== '網站名稱')
        await db.add(`${target.id}`, pure_websites);
        console.log('Count: ', i)
    }
};
main()
