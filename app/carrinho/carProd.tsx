'use client'
import { useState } from "react";
import { Product } from "../dados";
import Link from "next/link";

export default async function CartProd({ prodcar }:  { prodcar : Product[] }){
	
	const [cartProdutos] = useState(prodcar);	

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