'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Product } from './dados';
import { useState } from 'react';

interface ListaProdutosProps {
  produtos: Product[];
  prodInicial: Product[];
}

export default function ListaProdutos({ produtos, prodInicial }: ListaProdutosProps) {
  const [carProd, setCar] = useState(prodInicial);

  async function addToCart(productId: string) {
    try {
      const res = await fetch('https://acpteste.netlify.app/api/users/1/cart', {
        method: 'POST',
        body: JSON.stringify({ productId }),
        headers: { 'Content-Type': 'application/json' },
      });

      const atualizado = await res.json();
      setCar(atualizado);
    } catch (error) {
      console.error('Erro ao adicionar:', error);
    }
  }

  async function removeProd(productId: string) {
    try {
      const res = await fetch('https://acpteste.netlify.app/api/users/1/cart', {
        method: 'DELETE',
        body: JSON.stringify({ productId }),
        headers: { 'Content-Type': 'application/json' },
      });

      const atualizado = await res.json();
      setCar(atualizado);
    } catch (error) {
      console.error('Erro ao remover:', error);
    }
  }

  function checkCar(productId: string) {
    return carProd?.some((cp) => cp.id === productId);
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {produtos.map((p) => (
        <div
          key={p.id}
          className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition duration-300 flex flex-col h-full"
        >
          <Link href={`/produtos/${p.id}`} className="flex-grow p-4 block">
            <div className="flex justify-center">
              <Image
                src={`/${p.imageUrl}`}
                alt={`Imagem de ${p.name}`}
                width={200}
                height={200}
                className="object-contain"
              />
            </div>
            <h2 className="mt-4 text-xl font-semibold text-gray-800">{p.name}</h2>
            <p className="text-gray-600">R$ {p.price.toFixed(2)}</p>
          </Link>

          <div className="p-4 pt-0 mt-auto">
            {checkCar(p.id) ? (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  removeProd(p.id);
                }}
                className="w-full py-2 rounded-xl bg-red-100 text-red-700 font-semibold hover:bg-red-200 transition"
              >
                Desistir
              </button>
            ) : (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  addToCart(p.id);
                }}
                className="w-full py-2 rounded-xl bg-amber-400 text-indigo-800 font-semibold hover:bg-amber-500 transition"
              >
                Comprar
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}