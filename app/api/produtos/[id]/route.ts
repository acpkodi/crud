import { products } from "@/app/dados";
import { NextRequest } from "next/server";
import { stringify } from "querystring";


type Params = {
    id:string;
}


export async function GET(request: NextRequest, {params}: {params:Params}){
    const prodId = params.id;
    const prod = products.find(p=>p.id === prodId);
    
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