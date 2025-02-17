import { NextResponse } from "next/server"
import { auth } from "../../../../auth";
import { createProductsAdapter } from "@/adapters/adapters";

const EMAIL_KEY = process.env.EMAIL_KEY!
const URL_SHEETS_API = process.env.URL_API!


export async function GET() {
    try {
       const response = await fetch(URL_SHEETS_API);
       if (!response.ok) throw new Error("Error al obtener el catálogo");
       const data = await response.json();
       const adapterData = createProductsAdapter(data)
       return NextResponse.json({products:adapterData});
     } catch (error) {
       console.error("Error fetching catalog:", error);
        return NextResponse.json({products:[]});
     }
}


export async function POST (request:Request){

    const session = await auth()
    const emailAuth = session?.user?.email

//TODO: Colocar en variable de entorno
    if(emailAuth !== EMAIL_KEY) return NextResponse.json({message:"Usuario no autorizado.",code:401})

    try {
        const body = await request.json()
        const addProduct = await fetch(URL_SHEETS_API,{method:"POST",body:JSON.stringify(body)})
        const addProductResponse = await addProduct.json()
        return NextResponse.json({code:200,status:addProductResponse.status,message:addProductResponse.message})
   
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        return NextResponse.json({code:201,message:"Ocurrio un error inesperado!"})
    }

    
    
}