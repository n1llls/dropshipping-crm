import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main(){
  const email = "admin@example.com";
  const password = "admin123";
  const hash = await bcrypt.hash(password, 10);

  await prisma.user.upsert({
    where: { email },
    update: {},
    create: { email, password: hash, name: "Admin" }
  });

  const rack = await prisma.product.create({
    data: {
      name: "Стеллаж металлический 150x70x30",
      supplierName: "Поставщик А",
      defaultCost: 1000,
      defaultPrice: 1915,
      variants: {
        create: [
          { name: "4 полки", sku: "RACK-4", purchaseCost: 1000, salePrice: 1915 },
          { name: "5 полок", sku: "RACK-5", purchaseCost: 1200, salePrice: 2150 }
        ]
      }
    }, include: { variants: true }
  });

  // Example order
  await prisma.order.create({
    data: {
      customerName: "Гайдаш Катерина",
      phone: "+380996453190",
      address: "Кіровоградська обл., Кропивницький район, с. Новоградівка, вул. Молодіжна, 64",
      city: "Кропивницький",
      region: "Кіровоградська",
      carrier: "Nova Poshta",
      ttn: "GWI0582",
      status: "CONFIRMED",
      items: {
        create: [
          { productId: rack.id, variantId: rack.variants[0].id, quantity: 1, purchaseCost: 1000, salePrice: 1915 }
        ]
      }
    }
  });

  // Example ad spend
  await prisma.adSpend.create({
    data: { productId: rack.id, platform: "Google", date: new Date(), amount: 500, leads: 5 }
  });

  console.log("Seeded: admin@example.com / admin123");
}

main().finally(()=>prisma.$disconnect());
