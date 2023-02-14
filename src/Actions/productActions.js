import {FETCH_PRODUCTS} from '../types';
import axios from "axios";
export const fetchProduct =() => async(dispatch)=>{
    axios({
        method:"get",
        url :"http://localhost:5000/api/product",
    }).then((response)=> response.json()).then( data =>   console.log(data)).
    catch((error)=>console.log(error));
    
   dispatch({
    type : FETCH_PRODUCTS,
    // payload : data 
   })
}