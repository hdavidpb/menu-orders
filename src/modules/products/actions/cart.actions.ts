import { cookies } from "next/headers"






    
export const onAdd = async (name:string)=>{

const cookiesStore = await cookies()
const cart = JSON.parse(cookiesStore.get("cart")?.value ?? "{}")

if(cart[name]) {
    cart[name] += 1
}else{
    cart[name] = 1
}

}