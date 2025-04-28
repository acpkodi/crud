import { cnDB } from "@/db";
import { NextRequest } from 'next/server';


type ShoppingCart = Record<string, string[]>;

type Params = {
  id: string;
}

export async function GET(request: NextRequest, { params }: { params: Params }) {
  const { db } = await cnDB();
  const userId = params.id;
  const userCarts = await db.collection('carts').findOne({ userId: userId })

  if (!userCarts) {
    return new Response(JSON.stringify([]), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  const cartId = userCarts.cartIds;
  const cartProducts = await db.collection("produtos").find({ id: { $in: cartId } }).toArray();

  return new Response(JSON.stringify(cartProducts), {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  });
}

type CartBody = {
  productId: string;
}

export async function POST(request: NextRequest, { params }: { params: Params }) {
  const { db } = await cnDB();
  const userId = params.id;
  
  const body: CartBody = await request.json();
  const productId = body.productId;

  const updateCart = await db.collection("carts").findOneAndUpdate(
    { userId },
    { $push: { cartIds: productId }},
    { upsert: true, returnDocument: 'after' }
  );
      
    const cart = updateCart.value || await db.collection("carts").findOne({ userId });
    console.log('Carrinho atualizado:', cart);
    const cartProducts = await db.collection("produtos").find({ id: { $in: cart?.cartIds || [] } }).toArray();  
  
    return new Response(JSON.stringify(cartProducts), {
    status: 201,
    headers: {
      'Content-Type': 'application/json',
    }
  });
}

export async function DELETE(request: NextRequest, { params }: { params: Params }) {
  const { db } = await cnDB();
  const userId = params.id;
  const body: CartBody = await request.json();
  const productId = body.productId;

  // Verifica a remoção do item
  const updateCart = await db.collection("carts").findOneAndUpdate(
    { userId },
    { $pull: { cartIds: productId } },
    { returnDocument: 'after' }
  );

  // Verifica se o documento foi alterado
  if (!updateCart.value) {
    return new Response(
      JSON.stringify({ message: "Item não encontrado ou não removido." }),
      {
        status: 404,
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );
  }

  // Busca os produtos restantes no carrinho
  const cartProducts = await db
    .collection("produtos")
    .find({ id: { $in: updateCart.value.cartIds } })
    .toArray();

  // Verifica se há produtos no carrinho após a remoção
  if (cartProducts.length === 0) {
    return new Response(
      JSON.stringify({ message: "Carrinho vazio." }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );
  }

  return new Response(
    JSON.stringify({ message: "Produto removido com sucesso", products: cartProducts }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      }
    }
  );
}