import { cnDB } from "@/db"

export async function GET(){
   
    const { db } = await cnDB();
    const produtos = await db.collection('produtos').find({}).toArray();
   

   
    return new Response(JSON.stringify(produtos),{
        status: 200,
        headers:{
            'Content-type':'application/json'
        }
    });
    
}

export async function POST(){
    return new Response("teste via POST", {status: 200});
    
}