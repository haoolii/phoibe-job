import { PrismaClient } from "@prisma/client";
import { Record } from "./types";

const prisma = new PrismaClient();

export default {
  add: async (sourceId: string, records: Record[]) => {
    try {
      const rs = records.map((record) => ({
        websiteName: record.websiteName || "",
        url: record.url || "",
        count: record.count || 0,
        sourceId: sourceId || "",
      }));
      await prisma.record.createMany({
        data: rs,
      });
    } catch (e) {
      console.error(e);
    }
  },
};
