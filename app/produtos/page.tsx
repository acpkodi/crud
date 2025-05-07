import ListaProdutos from "../ListaProdutos";

export default async function ProdutosPage(){
	const cn = await fetch("https://acpteste.netlify.app/api/produtos");
	const prod = await cn.json();

	const cn2 = await fetch("https://acpteste.netlify.app/api/users/1/cart",{
		cache: "no-cache"
	});
	const cartProd = await cn2.json();

	return (
	<div className="container mx-auto p-8">		
			<h1 className="text-4xl font-bold mb-8">Produtos</h1>		
			<ListaProdutos produtos={prod} prodInicial={cartProd} />		
	</div>
	)
	
}