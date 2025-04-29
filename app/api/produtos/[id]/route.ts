import { cnDB } from "@/db"
import { NextRequest } from "next/server";

type Params = {
    id:string;
}


export async function GET(request: NextRequest, {params}: {params:Params}){
    const prodId = params.id;
    const { db } = await cnDB();
    const prod = await db.collection("produtos").findOne({id: prodId});
    
    if(!prod){
        return new Response("Produto não encontrado", {
            status:404,
            headers:{
                "Content-Type":"application/text"
            }
        })
    }
    
    return new Response(JSON.stringify(prod), {
        status: 200,
        headers:{
            "Content-Type":"application/json"
        }
    })
}