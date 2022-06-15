import { PrismaClient } from "@prisma/client"

declare global {
    var client: PrismaClient | undefined;
}

const client = global.client || new PrismaClient();

if (process.env.NODE_ENV === "development") global.client = client;

export default new PrismaClient();

/*
Next.js 우리 앱을 hot reload 한다. 그럴 때 마다 Prisma client가 계쏙 생성 되게 된다. 
이렇게 되면 db에는 연결에 한계가 생긴다. db는 연결을 무한히 받을 수 없고, PlanetScale도 마찬가지다.
const client = global.client || new PrismaClient(); 
solution)
이렇게 client가 global object에 저장 돼 있는 client랑 같다고 명시해준다.
global client가 존재하지 않으면 어플리케이션이 맨 처음 구동 될 때 존재하지 않기 때문에 
new PrismaClient(); 새로운 client를 만들어 준다.
if (process.env.NODE_ENV === "development") global.client = client;
그 다음 global.client에 저장해 준다.
*/