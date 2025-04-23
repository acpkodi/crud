export async function GET(){
    return new Response("teste via GET", {status: 200});
    
}

export async function POST(){
    return new Response("teste via POST", {status: 200});
    
}