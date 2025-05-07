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

	async function removeProd(productId:string){
		try{
		const cn = await fetch("https://acpteste.netlify.app/api/users/1/cart",{
			method: "DELETE", 
			body: JSON.stringify({
				productId
			}),
			headers:{
				'Content-Type' : 'application/json'
			}
		});

		const atualizaCar = await cn.json();				
		setCar(atualizaCar)
		}catch(e){
			console.log("Atualizar "+ e)
		}
	}

	function checkCar(productId: string){
		try{
			return carProd.some(cp => cp.id === productId)
		}catch(e){
			console.log("Erro check: "+e)
		}
	}

	return (
		<div>
			{
				produtos.map(p=>(
					<>
					<Link key={p.id} href={"/produtos/"+p.id}>
						<Image src={"/"+p.imageUrl} alt="Imagem do produto" width={150} height={150}  />
						<h2>{p.name}</h2>
						<p>R${p.price}</p>	

					{checkCar(p.id) ? (
						<button className='p-4 m-4 bg-amber-400 text-indigo-700 hover:bg-amber-600' onClick={
							(e) => { e.preventDefault(); 
								removeProd(p.id);}
							}>Desistir</button>
					) : (
						<button className='p-4 m-4 bg-amber-400 text-indigo-700 hover:bg-amber-600' onClick={
							(e) => { e.preventDefault(); 
							addToCart(p.id);}
							}>Comprar
						</button>
					)}
					
					</Link>
					</>
				))
			}
		</div>
	)

	}