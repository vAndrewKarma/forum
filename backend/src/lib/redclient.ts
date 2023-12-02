import Init_Store from "./store";
async function client_init() {
 
const store = await Init_Store()   
return store.data.client
}


export default await client_init()