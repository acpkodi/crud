'use client'
import { useState } from "react";
import { products } from "../dados";
import Link from "next/link";

export default function CartPage(){
	
	const [carrinho] = useState(['123', '345']);

	const cartProdutos = carrinho.map(id => products.find(p=> p.id === id)!);

	return (
<>
		<h1>Carrinho</h1>
		{cartProdutos.map(prod => (
			<Link key={prod.id} href={"/produtos/" + prod.id}>
				<h3>{prod.name}</h3>
				<p>R${prod.price}</p>
			</Link>
		))}
</>
)
	
}