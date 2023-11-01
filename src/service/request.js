import axios from "axios";
const instance=axios.create({
    baseURL:"http://127.0.0.1:5000",
    timeout:60000
})
export function get(url,data={}){
    return new Promise((resolve,reject)=>{
        instance.get(url,{
            params:data
        }).then((response)=>{
            resolve(response)
        }).catch((err)=>{
            reject(err)
        })
    })
}
export function post(url,data={}){
    return new Promise((resolve,reject)=>{
       instance.post(url,data).then(
        (response)=>{
            resolve(response.data)
        },
        (err)=>{
            reject(err)
        }
       )
    })
}
