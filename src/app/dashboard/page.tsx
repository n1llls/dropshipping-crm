import { prisma } from "@/lib/prisma";

export default async function DashboardPage(){
  const [ordersCount, productsCount] = await Promise.all([
    prisma.order.count(),
    prisma.product.count()
  ])
  return (
    <div className="grid gap-6 md:grid-cols-3">
      <div className="rounded-2xl p-6 bg-white/5 border border-white/10">
        <div className="text-white/60 text-sm">Заказы</div>
        <div className="text-3xl font-bold mt-1">{ordersCount}</div>
      </div>
      <div className="rounded-2xl p-6 bg-white/5 border border-white/10">
        <div className="text-white/60 text-sm">Товары</div>
        <div className="text-3xl font-bold mt-1">{productsCount}</div>
      </div>
      <div className="rounded-2xl p-6 bg-white/5 border border-white/10">
        <div className="text-white/60 text-sm">Добро пожаловать</div>
        <div className="text-3xl font-bold mt-1">CRM готова</div>
      </div>
    </div>
  )
}
