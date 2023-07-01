import { PrismaClient } from "@prisma/client";

// globalThisのnamespaceにprismadbという変数を追加する
declare global {
  namespace globalThis {
    var prismadb: PrismaClient;
  }
}