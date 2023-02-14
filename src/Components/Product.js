import React, {  useState } from "react";
import formatCurrency from "../util";
import  Fade  from "react-reveal/Fade";
import Modal from 'react-modal';
import Zoom  from "react-reveal/Zoom";
import { connect } from "react-redux";
import { fetchProduct} from '../Actions/productActions'

//////////////////////////////////////////////////


export const Product =(props)=>{
    
    const [pruduct,setProduct] = useState(null);

    const opneModal =(product)=>{
        setProduct(product)
    }

    const closeModal =()=>{
      setProduct(null)
    }

    const addToCart = props.addToCart ;
    return (
        <div>
            <Fade bottom cascade>
                {
                    ! props.props.products ? (
                    <div>Loading.......</div>
                    ) : (
                        <ul className="products"> 
                {
                    props.props.products.map(product => (
                        <li key={product.id}>
                            <div className="product">
                                <a href={"#"+ product._id} onClick={()=>opneModal(product)} >
                                    <img src={product.image} alt={product.title}/>
                                <p>{product.title}</p>    
                                </a>
                            </div>
                            <div className="product-price"> 
                                <div> {formatCurrency(product.price)}</div>
                                <button className="button"  onClick={()=>addToCart(product)}>ADD TO CART</button>
                            </div>
                        </li>
                    ))
                }
            </ul>
                    )
                }
            
            </Fade>
            {
                pruduct && (
                <Modal isOpen={true} onRequestClose={closeModal}>
                    <Zoom>
                        <button onClick={closeModal}>X</button>
                        <div className="product-details"> 
                            <img src={pruduct.image} alt={pruduct.title}/>
                            <div className="product-details-description">
                                <p>
                                    <strong>{pruduct.title}</strong>
                                </p>
                                <p>
                                 {pruduct.description}
                                </p>
                                <p>
                                Available Sizes  {pruduct.availableSizes.map( x =>(
                                    <span>{" "} <button>{x}</button></span>
                                ))}
                                </p>
                                <div className="product-price">
                                    <div>
                                        {formatCurrency(pruduct.price)}
                                        <button className="button primary"  onClick={()=>{
                                            addToCart(pruduct)
                                            closeModal()} }>Add To Cart</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Zoom> </Modal>)
            }
        </div> 
    )
}
export default connect((state )=>({products : state.products.items }),{fetchProduct}) (Product);

//// 