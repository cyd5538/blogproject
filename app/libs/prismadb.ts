import { PrismaClient } from '@prisma/client'

// globalThis에 prisma라는 속성이 있으면 해당 속성을 할당하고,
// 그렇지 않으면 새로운 PrismaClient 인스턴스를 생성하여 할당한다.
declare global {
    var prisma : PrismaClient | undefined
}

const client = globalThis.prisma || new PrismaClient()

// NODE_ENV 환경변수가 "production"이 아니면, prisma 인스턴스를 globalThis에 할당한다.
// 이렇게 하면 개발 환경에서 Prisma 클라이언트의 성능을 향상시킬 수 있다.
if(process.env.NODE_ENV !== "production") globalThis.prisma = client;

export default client;