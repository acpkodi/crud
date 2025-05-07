'use client'
import { useState } from "react";
import { Product } from "../dados";
import Link from "next/link";

export default async function CartProd({ prodcar }:  { prodcar : Product[] }){
	
	const [cartProdutos] = useState(prodcar);	

	return (
		<div>
				<h1>Carrinho</h1>
				<div className="grid place-items-center h-screen">
				{cartProdutos.map(prod => (
					<Link key={prod.id} href={"/produtos/" + prod.id}>
						<div ><img className="w-40 h-40 shadow-md" src={"/" + prod.imageUrl} alt="Imagem" /></div>
						<h3>{prod.name}</h3>
						<p>R${prod.price}</p>
					</Link>
				))}
				</div>
		</div>
	)
	
}