import { NextResponse } from "next/server"
import { decrypt } from "@/utils/encriptDecript";

const emailKey = process.env.EMAIL_KEY



export async function POST (request:Request){
    const headers = request.headers;
    const emailAuth = headers.get("authorization")

    const encriptedEmail = decrypt(emailAuth ?? "")

//TODO: Colocar en variable de entorno
    if(encriptedEmail !== emailKey) return NextResponse.json({message:"Usuario no autorizado.",code:401})

    try {
        const body = await request.json()
        const addProduct = await fetch("https://script.google.com/macros/s/AKfycbznRwAu_LAct1PrnwORYHYWJyQDl3C9KAMoAN2r9TKve_082UwQe_f8hdoK6n_uZjmbVA/exec",{method:"POST",body:JSON.stringify(body)})
        const addProductResponse = await addProduct.json()
        return NextResponse.json({code:200,status:addProductResponse.status,message:addProductResponse.message})
   
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        return NextResponse.json({code:201,message:"Ocurrio un error inesperado!"})
    }

    
    
}