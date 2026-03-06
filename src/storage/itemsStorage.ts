import AsyncStorage from "@react-native-async-storage/async-storage";
import { FilterStatus } from "@/types/FilterStatus";

const ITEM_STORAGE_KEY = "@comprar:items";

export type ItemStorage = {
    id : string
    status : FilterStatus;
    description : string;
}

async function get(): Promise<ItemStorage[]>{
    try{
        const storage = await AsyncStorage.getItem(ITEM_STORAGE_KEY);
        return storage ? JSON.parse(storage) : [];
    }catch(error){
        throw new Error("Get_Items_Error"+ error);
    }
}

async function getByStatuts(Status : FilterStatus) : Promise<ItemStorage[]>{
    const items = await get();
    return items.filter((item) => item.status === Status);
}

async function save(items : ItemStorage[]): Promise<void>{
 try{
    await AsyncStorage.setItem(ITEM_STORAGE_KEY, JSON.stringify(items));
 }catch(error){
    throw new Error("Save_Items_Error"+ error);
 }
}

async function add(newItem : ItemStorage): Promise<ItemStorage[]>{
    const items = await get();
    const updatedItems = [...items, newItem];
    await save(updatedItems);
    return updatedItems;
}

async function  remove(id : string){
    const items = await get();
    const updatedItems = items.filter((item) => item.id !== id);
    await save(updatedItems);
}

async function clear() : Promise<void>{
    try{
        await AsyncStorage.removeItem(ITEM_STORAGE_KEY);
    }catch(error){
        throw new Error("Clear_Items_Error"+ error);
    }
}

async function toggleStatus(id : string): Promise<void>{
    const items = await get();
    const updatedItems = items.map((item) => {
        return item.id === id ? {
                ...item,
                status : item.status === FilterStatus.Pending ? FilterStatus.Done : FilterStatus.Pending
            } : item
    })
    await save(updatedItems); 
}


export const ItemsStorage = {
    get,
    getByStatuts,
    add,
    remove,
    clear,
    toggleStatus
}
