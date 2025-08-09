import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"

export async function POST(req: Request) {
  const session = await auth(); if (!session) return new Response("Unauthorized", { status: 401 })
  const data = await req.json()
  const v = await prisma.variant.create({ data })
  return Response.json(v)
}
