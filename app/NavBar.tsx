'use client';

import Link from "next/link";

export default function NavBar() {
    const handleCarrinhoClick = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        window.location.href = '/carrinho'; // força reload completo
    };

    return (
        <nav className="bg-white shadow-md">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                <ul className="flex space-x-4">
                    <li>
                        <Link href="/produtos" className="text-gray-700 hover:text-black">Produtos</Link>
                    </li>
                    <li>
                        <a
                            href="/carrinho"
                            onClick={handleCarrinhoClick}
                            className="text-gray-700 hover:text-black"
                        >
                            Carrinho
                        </a>
                    </li>
                    <li>
                        <Link href="/checkout" className="text-gray-700 hover:text-black">Checkout</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}