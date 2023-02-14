import React, { useState } from "react";
import formatCurrency from "../util";
import  Fade  from "react-reveal/Fade";

////////////////////////


export const Cart = (cartItems) => {
    const [showCheckout, setShowCheckout] = useState(false);
    const [inputs, setInputs] = useState([]);
    const cartItemData = cartItems.cartItem;
    const cartLenght = cartItemData.length;

    const careteOrder= (e)=>{
        e.preventDefault();
        const order = {
            name : inputs.name ,
            email : inputs.email ,
            address : inputs.address ,
            cartItem :  cartItemData ,
        }
        // console.log()
        cartItems.createOrderCart(order)
    }

    const handleInput= (e)=>{
        let names = e.target.name ;
        let value =  e.target.value ;
        setInputs( values =>( {  ...values , [names] : value  }))
    }
    return (
        <div>
            {cartLenght === 0 ? (<div className="cart cart-header">Cart is empty</div>
            ) : (
                <div className="cart cart-header"> You have {cartLenght} in the cart {" "}</div>)
            }
            <div>
                <div className="cart">
            <Fade left cascade>
                    <ul className="cart-items">
                        {
                            cartItemData.map(item => (
                                <li key={item._id}>
                                    <div>
                                        <img src={item.image} alt={item.title} />
                                    </div>
                                    <div>
                                        <div>{item.title}</div>
                                        <div className="right"> {formatCurrency(item.price)} X {item.count} {" "}

                                            <button className="button" onClick={() => cartItems.removeCart(item)}>Remove Cart</button></div>
                                    </div>
                                </li>
                            ))
                        }
                    </ul>
                    </Fade>
                </div>
                {cartLenght !== 0 && (
                    <div>
                    <div className="cart">
                        <div className="total">
                            <div>
                                Total:{" "}
                                {
                                    formatCurrency(cartItemData.reduce((a, c) => a + c.price * c.count, 0))
                                }</div>
                            <button className="button primary" onClick={() => setShowCheckout(true)}>Proceed</button>
                        </div>
                    </div>
                    {
                        showCheckout && (
                            <Fade right  cascade>                            
                            <div className="cart">
                            <form onSubmit={careteOrder}> 
                            <ul className="form-container">
                                <li>
                                    <label>Email</label>
                                    <input type="email" name="email" required  onChange={handleInput} />
                                </li>

                                <li>
                                    <label>Name</label>
                                    <input type="text" name ="name" required  onChange={handleInput} />
                                </li>

                                <li>
                                    <label>Addres</label>
                                    <input type="text" name="address" required  onChange={handleInput} />
                                </li>
                                <li>
                                    <button className="button primary" type="submit">Checkout</button>
                                </li>
                            </ul>
                            </form> 
                            </div>
                            </Fade>
                            

                        )}
                        </div>
                )}
            </div>
        </div>
    )
}