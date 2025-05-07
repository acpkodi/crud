'use client';

import { useEffect, useState } from "react";
import { Product } from "../dados";
import Link from "next/link";

export default function CartProd() {
  const [cartProdutos, setCartProdutos] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

    fetchCarrinho();
  }, []);

  if (loading) {
    return <p>Carregando carrinho...</p>;
  }

  return (
    <div>
      <h1>Carrinho</h1>
      <div className="min-h-screen flex items-center justify-center">
        <div className="grid grid-cols-3 gap-6">
          {cartProdutos.map((prod) => (
            <Link key={prod.id} href={`/produtos/${prod.id}`}>
              <div>
                <img
                  className="w-40 h-40 shadow-md"
                  src={`/${prod.imageUrl}`}
                  alt={prod.name}
                />
              </div>
              <h3>{prod.name}</h3>
              <p>R${prod.price}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}