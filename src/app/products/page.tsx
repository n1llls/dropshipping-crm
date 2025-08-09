"use client";
import useSWR from "swr";
import { useState } from "react";
import Card from "@/components/Card";

const fetcher = (url:string)=> fetch(url).then(r=>r.json())

export default function ProductsPage(){
  const { data: products, mutate } = useSWR("/api/products", fetcher)
  const [form, setForm] = useState({ name: "", supplierName: "", defaultCost: "", defaultPrice: "" })
  const [variant, setVariant] = useState({ productId: "", name: "", sku: "", purchaseCost: "", salePrice: "" })

  const addProduct = async () => {
    await fetch("/api/products", { method: "POST", body: JSON.stringify({
      ...form,
      defaultCost: Number(form.defaultCost || 0),
      defaultPrice: Number(form.defaultPrice || 0)
    }) })
    setForm({ name: "", supplierName: "", defaultCost: "", defaultPrice: "" })
    mutate()
  }

  const addVariant = async () => {
    await fetch("/api/variants", { method: "POST", body: JSON.stringify({
      ...variant,
      productId: Number(variant.productId || 0),
      purchaseCost: Number(variant.purchaseCost || 0),
      salePrice: Number(variant.salePrice || 0)
    }) })
    setVariant({ productId: "", name: "", sku: "", purchaseCost: "", salePrice: "" })
    mutate()
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card title="Добавить товар">
        <div className="grid grid-cols-2 gap-2">
          {["name","supplierName","defaultCost","defaultPrice"].map((k)=>(
            <input key={k} placeholder={k} value={(form as any)[k]} onChange={e=>setForm({...form,[k]:e.target.value})} className="rounded-lg bg-white/10 px-3 py-2 outline-none"/>
          ))}
        </div>
        <button onClick={addProduct} className="mt-3 rounded-xl bg-brand-500 hover:bg-brand-600 px-4 py-2">Сохранить</button>
      </Card>

      <Card title="Добавить вариант товара">
        <div className="grid grid-cols-2 gap-2">
          {["productId","name","sku","purchaseCost","salePrice"].map((k)=>(
            <input key={k} placeholder={k} value={(variant as any)[k]} onChange={e=>setVariant({...variant,[k]:e.target.value})} className="rounded-lg bg-white/10 px-3 py-2 outline-none"/>
          ))}
        </div>
        <button onClick={addVariant} className="mt-3 rounded-xl bg-brand-500 hover:bg-brand-600 px-4 py-2">Сохранить</button>
      </Card>

      <Card title="Список товаров">
        {!products ? <div>Загрузка...</div> : (
          <div className="space-y-3">
            {products.map((p:any)=>(
              <div key={p.id} className="rounded-xl bg-white/5 border border-white/10 p-3">
                <div className="font-medium">{p.name}</div>
                <div className="text-sm text-white/70">Поставщик: {p.supplierName} · Себестоимость: {p.defaultCost} · Цена: {p.defaultPrice}</div>
                {p.variants?.length>0 && (
                  <div className="mt-2 text-sm">
                    <div className="opacity-70">Варианты:</div>
                    <ul className="list-disc ml-6">
                      {p.variants.map((v:any)=>(<li key={v.id}>{v.name} ({v.sku || "no sku"}): {v.purchaseCost} → {v.salePrice}</li>))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  )
}
