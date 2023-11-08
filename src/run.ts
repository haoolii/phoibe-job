import { parseContent } from "./utils";

const API = "https://165.npa.gov.tw/api/article/subclass/3";

import db from "./db";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const main = async () => {
  let source = await prisma.source.findFirst({
    where: {
      name: "165",
    },
  });
  if (!source) {
    source = await prisma.source.create({
      data: {
        name: "165",
        description: "165",
      },
    });
  }
  const response = await fetch(API);
  const json = await response.json();
  const data = JSON.parse(JSON.stringify(json)).slice(5);
  console.log(data)
  for(let i = 0; i < data.length; i++) {
      const target = data[i];
      const websites = parseContent(target.content)
      const pure_websites = websites.filter(website => website.websiteName !== '網站名稱')
      await db.add(`${target.id}`, `${source.id}`, pure_websites);
      console.log('Count: ', i)
  }
};
main();
