export async function GET(){
    return new Response(JSON.stringify({msg: "teste via GET"}), {status: 200});
    
}

export async function POST(){
    return new Response(JSON.stringify({msg: "teste via POST"}), {status: 200});
    
}