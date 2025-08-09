# Dropshipping CRM (Next.js + Prisma + NextAuth)

Современная CRM для дропшипинга: товары, варианты, заказы с TTN, статусы, учёт рекламных расходов, ROS/ROI/CPL, красиво и с анимациями.

## Стек
- Next.js 14 (App Router, TypeScript)
- Prisma + SQLite
- NextAuth (Credentials)
- TailwindCSS + Framer Motion
- Recharts для графиков

## Быстрый старт

```bash
git clone <this-repo>
cd dropshipping-crm
cp .env.example .env
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run seed
npm run dev
```

Открой: http://localhost:3000  
Логин: `admin@example.com` / Пароль: `admin123`

## Возможности
- Добавление товара: название, поставщик, себестоимость, цена.
- Варианты товара со своими ценами и SKU.
- Заказы: ФИО, телефон, адрес, город/область, перевозчик (Nova Poshta), TTN, статус.
- Позиции заказа с количеством и снимком цен на момент продажи.
- Редактирование заказа (через API PATCH — UI-редактор можно расширить).
- Рекламные расходы по товарам: платформа, дата, сумма, лиды.
- Дашборд и страницы: Products / Orders / Stats.
- Метрики по каждому товару:
  - **Profit** = Revenue − Cost − AdSpend
  - **ROI** = Profit / AdSpend
  - **ROS** = Revenue / AdSpend
  - **CPL** = AdSpend / Leads

## Куда дальше
- Добавить роли пользователей и аудит-лог.
- Импорт/экспорт CSV (товары/заказы/расходы).
- Интеграции: Новая Почта, платёжки, вебхуки рекламы.
- PWA и мобильная иконка.
- Статусы заказов и Kanban.
- Фильтры/поиск по заказам и товарам.

## Лицензия
MIT
