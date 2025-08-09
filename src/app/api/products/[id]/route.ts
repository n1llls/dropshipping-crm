import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const session = await auth(); if (!session) return new Response("Unauthorized", { status: 401 })
  const data = await req.json()
  const prod = await prisma.product.update({ where: { id: Number(params.id) }, data })
  return Response.json(prod)
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  const session = await auth(); if (!session) return new Response("Unauthorized", { status: 401 })
  await prisma.product.delete({ where: { id: Number(params.id) } })
  return new Response(null, { status: 204 })
}
