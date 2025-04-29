import ListaProdutos from "../ListaProdutos";
import { products } from "../dados";

export default function ProdutosPage(){
	
	return (
	<div className="container mx-auto p-8">		
			<h1 className="text-4xl font-bold mb-8">Produtos</h1>		
			<ListaProdutos produtos={products} />		
	</div>
	)
	
}