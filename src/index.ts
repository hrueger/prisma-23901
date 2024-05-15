import { PrismaClient } from '@prisma/client'
import { PrismaD1 } from '@prisma/adapter-d1'

export interface Env {
	DB: D1Database
}

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		const adapter = new PrismaD1(env.DB)
		const prisma = new PrismaClient({ adapter })

		if ((await prisma.post.count()) == 0) {

			const post = await prisma.post.create({
				data: {
					title: "Hello World" + Math.random(),
					author: {
						create: {
							email: "test@test.de",
							name: "Test Test"
						}
					}
				}
			});
		}
		return new Response(JSON.stringify(await prisma.user.findMany({ include: { posts: true } })), { status: 200, headers: { 'Content-Type': 'application/json' } })
	},
};