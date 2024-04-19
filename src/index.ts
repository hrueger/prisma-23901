import { PrismaClient } from '@prisma/client'
import { PrismaD1 } from '@prisma/adapter-d1'

export interface Env {
  DB: D1Database
}

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const adapter = new PrismaD1(env.DB)
    const prisma = new PrismaClient({ adapter })

	const post = await prisma.post.create({
		data: {
			title: "Hello World" + Math.random(),
		}
	});
    const user = await prisma.user.create({
		data: {
			email: Math.random() + "test@test.de",
			name: "Test",
			posts: {
				connect: {
					id: post.id
				}
			}
		}
	});
    return new Response(JSON.stringify(await prisma.user.findMany({include: {posts: true}})), { status: 200, headers: { 'Content-Type': 'application/json' }})
	},
};