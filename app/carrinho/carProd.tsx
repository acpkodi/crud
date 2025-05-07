'use client';

import { useEffect, useState } from "react";
import { Product } from "../dados";
import Link from "next/link";

export default function CartProd() {
  const [cartProdutos, setCartProdutos] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCarrinho();
  }, []);

  async function fetchCarrinho() {
    setLoading(true);
    try {
      const res = await fetch("https://acpteste.netlify.app/api/users/1/cart", {
        cache: "no-cache"
      });
      const data = await res.json();
      setCartProdutos(data);
    } catch (error) {
      console.error("Erro ao carregar carrinho:", error);
    } finally {
      setLoading(false);
    }
  }

  async function removeItem(productId: string) {
    try {
      const res = await fetch("https://acpteste.netlify.app/api/users/1/cart", {
        method: "DELETE",
        body: JSON.stringify({ productId }),
        headers: { 'Content-Type': 'application/json' }
      });

      const data = await res.json();
      setCartProdutos(data);
    } catch (error) {
      console.error("Erro ao remover item:", error);
    }
  }

  if (loading) {
    return <p>Carregando carrinho...</p>;
  }

  if (cartProdutos.length === 0) {
    return <p className="text-center text-gray-600 mt-10">Seu carrinho está vazio.</p>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Carrinho</h1>
      <div className="min-h-screen flex items-center justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cartProdutos.map((prod) => (
            <div
              key={prod.id}
              className="bg-white rounded-xl shadow-md p-4 flex flex-col justify-between"
            >
              <Link href={`/produtos/${prod.id}`} className="block mb-4">
                <img
                  className="w-40 h-40 mx-auto object-contain"
                  src={`/${prod.imageUrl}`}
                  alt={prod.name}
                />
                <h3 className="text-lg font-semibold text-gray-800 text-center mt-2">{prod.name}</h3>
                <p className="text-center text-gray-600">R$ {prod.price.toFixed(2)}</p>
              </Link>

              <button
                onClick={() => removeItem(prod.id)}
                className="mt-2 py-2 px-4 rounded-xl bg-red-100 text-red-700 font-semibold hover:bg-red-200 transition"
              >
                Remover
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}