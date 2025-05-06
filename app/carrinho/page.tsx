import CartProd from "./carProd";

export default async function CartPage(){
	
	const cn = await fetch("https://acpteste.netlify.app/api/users/1/cart", {
		cache: "no-cache"
	});
	const carprodutos = await cn.json() 

	return(
		<CartProd prodcar={carprodutos} />
	)
	
}