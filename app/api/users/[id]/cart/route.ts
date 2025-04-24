import { NextRequest } from 'next/server';
import { cnDB } from "@/db";

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

  const updateCart = db.collection('carts').findOneAndUpdate(
    { userId },
    { $push: { cartIds: productId }},
    { upsert: true, returnDocument: 'after' }
  );

  const cartProducts = await db.collection("produtos").find({ id: { $in: updateCart.cartIds } }).toArray()

  return new Response(JSON.stringify(cartProducts), {
    status: 201,
    headers: {
      'Content-Type': 'application/json',
    }
  });
}
/*
export async function DELETE(request: NextRequest, { params }: { params: Params }) {
  const userId = params.id;
  const body: CartBody = await request.json();
  const productId = body.productId;

  carts[userId] = carts[userId] ? carts[userId].filter(p=> p !== productId) : [];  
  const cartProducts = carts[userId].map(id => products.find(p => p.id === id));

  return new Response(JSON.stringify(cartProducts), {
    status: 202,
    headers: {
      'Content-Type': 'application/json',
    }
  });
 
}
   */