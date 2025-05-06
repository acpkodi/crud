'use client';

import  Image  from 'next/image';
import  Link  from 'next/link';
import { Product } from "./dados";
import { useState } from 'react';


export default function ListaProdutos({produtos, prodInicial}:{produtos: Product[], prodInicial: Product[]}){

	const [carProd, setCar] = useState(prodInicial); 

	async function addToCart(productId:string){
		const cn = await fetch("https://acpteste.netlify.app/api/users/1/cart",{
			method: "POST", 
			body: JSON.stringify({
				productId
			}),
			headers:{
				'Content-Type' : 'application/json'
			}
		});

		const atualizaCar = await cn.json();
		setCar(atualizaCar)
	}
	return (
		<div>
			{
				produtos.map(p=>(
					<Link key={p.id} href={"/produtos/"+p.id}>
						<Image src={"/"+p.imageUrl} alt="Imagem do produto" width={150} height={150}  />
						<h2>{p.name}</h2>
						<p>R${p.price}</p>
						<button onClick={() => addToCart(p.id)}>Comprar</button>

					</Link>
				))
			}
		</div>
	)

	}