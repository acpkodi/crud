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

  // Verifica se o produto está presente no carrinho
  const userCart = await db.collection("carts").findOne({ userId });

  if (!userCart || !userCart.cartIds.includes(productId)) {
    return new Response(
      JSON.stringify({ message: "Produto não encontrado no carrinho." }),
      {
        status: 404,
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );
  }

  // Realiza a remoção do produto do carrinho
  const updateCart = await db.collection("carts").findOneAndUpdate(
    { userId },
    { $pull: { cartIds: productId } },
    { returnDocument: 'after' }
  );

  console.log("updateCart:", updateCart);  // Adicionando log para depuração

  // Verifica se a atualização foi bem-sucedida
  if (!updateCart.value) {
    return new Response(
      JSON.stringify({ message: "Falha ao remover o produto do carrinho." }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );
  }

  // Verifique se o array de cartIds foi realmente atualizado
  const updatedCartIds = updateCart.value.cartIds;
  if (!updatedCartIds || updatedCartIds.length === 0) {
    return new Response(
      JSON.stringify({ message: "Carrinho vazio após remoção." }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );
  }

  // Busca os produtos restantes no carrinho após a remoção
  const cartProducts = await db
    .collection("produtos")
    .find({ id: { $in: updatedCartIds } })
    .toArray();

  // Verifica se existem produtos no carrinho após a remoção
  if (cartProducts.length === 0) {
    return new Response(
      JSON.stringify({ message: "Carrinho vazio após remoção." }),
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