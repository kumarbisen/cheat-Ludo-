import {MMKV} from 'react-native-mmkv';

let storage;

try {
   storage = new MMKV();
} catch (error) {
    console.error(error)
   
}

const reduxStorage = {
    setItem:(key, value)=>{
        storage.set(key,value);
        return Promise.resolve(true);
    },
    getItem:(key)=>{
        const value = storage.getString(key)
        return Promise.resolve(value);
    },removeItem:(key)=>{
        storage.delete(key)
        return Promise.resolve();
    }
}

export default reduxStorage;