'use client';

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function NavBar() {
    const pathname = usePathname();
    const router = useRouter();

    const handleCarrinhoClick = (e: { preventDefault: () => void; }) => {
        if (pathname === '/carrinho') {
            e.preventDefault();
            router.refresh(); // Recarrega dados na mesma página (Next 13+ App Router)
        }
    };

    return (
        <nav className="bg-white shadow-md">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                <ul className="flex space-x-4">
                    <li>
                        <Link href="/produtos" className="text-gray-700 hover:text-black">Produtos</Link>
                    </li>
                    <li>
                        <Link
                            href="/carrinho"
                            onClick={handleCarrinhoClick}
                            className="text-gray-700 hover:text-black"
                        >
                            Carrinho
                        </Link>
                    </li>
                    <li>
                        <Link href="/checkout" className="text-gray-700 hover:text-black">Checkout</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}