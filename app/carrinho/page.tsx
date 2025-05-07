// app/carrinho/page.tsx
import dynamic from 'next/dynamic';

const CartProd = dynamic(() => import('./carProd'), { ssr: false });

export default function CartPage() {
  return <CartProd />;
}