import CartProd from "./carProd";

export default async function CartPage(){
	
	const cn = await fetch("https://acpteste.netlify.app/api/users/1/cart");
	const carprodutos = await cn.json() 

	return(
		<CartProd prodcar={carprodutos} />
	)
	
}