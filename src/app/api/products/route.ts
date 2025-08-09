import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"

export async function GET() {
  const session = await auth(); if (!session) return new Response("Unauthorized", { status: 401 })
  const products = await prisma.product.findMany({ include: { variants: true } })
  return Response.json(products)
}

export async function POST(req: Request) {
  const session = await auth(); if (!session) return new Response("Unauthorized", { status: 401 })
  const data = await req.json()
  const prod = await prisma.product.create({ data })
  return Response.json(prod)
}
