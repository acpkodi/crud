export default async function loginPage(){
    const dados = await fetch("http://localhost:3000/teste")    
    const saida = await dados.json();
    return <h1>{saida.msg}   </h1> 
}

