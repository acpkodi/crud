import  Image  from 'next/image';
import  Link  from 'next/link';
import { Product } from "./dados";


export default function ListaProdutos({produtos}:{produtos: Product[]}){

	return (
		<div>
			{
				produtos.map(p=>(
					<Link key={p.id} href={"/produtos/"+p.id}>
						<Image src={"/"+p.imageUrl} alt="Imagem do produto" width={150} height={150}  />
						<h2>{p.name}</h2>
						<p>R${p.price}</p>

					</Link>
				))
			}
		</div>
	)

	}