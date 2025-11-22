import { PrismaClient } from "@/app/generated/prisma/client";
import { neonConfig } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";
import ws from "ws";
import { t3env } from "./env";

// Configure Neon to use WebSockets
neonConfig.webSocketConstructor = ws;

const connectionString = t3env.DATABASE_URL;

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

const createPrismaClient = () => {
  const adapter = new PrismaNeon({ connectionString });

  return new PrismaClient({ adapter });
};

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
