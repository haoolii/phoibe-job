import { PrismaClient } from "@prisma/client";
import { Record } from "./types";

const prisma = new PrismaClient();

export default {
  add: async (originId: string, sourceId: string, records: Record[]) => {
    try {
      const rs = records.map((record) => ({
        websiteName: record.websiteName || "",
        url: record.url || "",
        count: record.count || 0,
        originId: originId || '',
        sourceId: sourceId,
        published: true,
        deleted: false,
      }));
      await prisma.record.createMany({
        data: rs,
      });
    } catch (e) {
      console.error(e);
    }
  },
};
