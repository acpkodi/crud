import { products } from "@/app/dados"
import NotFound from "@/app/not-found";

export default async function ProdDetalhesPage({params} : {params: {id: string}}){
	
	const cn = await fetch("https://acpteste.netlify.app/api/produtos/" + params.id)
	const prod = cn.json();
	
	if(!prod){
		return <NotFound/>
	}

	return (
	<div className="container flex flex-col mx-auto p-8 md:flex-row justify-center">
		<div className="md:w-1/2 mb-4 mr-5">
			<img className="w-full h-auto shadow-md" src={"/" + prod.imageUrl} alt="Imagem" />
		</div>
		<div className="md:w-1/2 mb-4">
			<h1 className="text-4xl font-bold mb-4">{prod!.name}</h1>
			<p className="text-2xl text-gray-600 mb-6">R${prod!.price}</p>
			<h3 className="text-2xl font-semibold mb-2">Descrição</h3>
			<p className="text-2xl text-gray-800 mb-6">{prod!.description}</p>
		</div>
	</div>	
	)
	
}