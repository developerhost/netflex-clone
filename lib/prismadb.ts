// PrismaClientをインポートする
import { PrismaClient } from "@prisma/client";

// globalThisのprismadb変数が存在しなければ、新しいPrismaClientインスタンスを作成する
const client = global.prismadb || new PrismaClient();

// 環境変数NODE_ENVが"production"の場合、globalThisのprismadbにclientを代入する
if (process.env.NODE_ENV === "production") global.prismadb = client;

// クライアントをデフォルトエクスポートする
export default client;
