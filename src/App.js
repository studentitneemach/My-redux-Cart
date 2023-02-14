import React, { useState } from 'react';
import { Provider } from 'react-redux';
import './App.css';
import { Cart } from './Components/Cart';
import { Filter } from './Components/Filter';
import { Product } from './Components/Product';
import data from './data.json';
import store from './Store';
///////////////////////////////////////////////

function App() {

  const [products, setProducte] = useState({
    products: data.products,
    size: "",
    sort: "",
  })
  const [cartItems, setCartItem] = useState(localStorage.getItem("cartItem") ? JSON.parse(localStorage.getItem("cartItem")) : [])

  /////////////////////////////////////////////////////////

  const addToCart = (product) => {
    let cartItem = cartItems.slice();
    let alreadyInCart = false;
    cartItem.forEach((item) => {
      if (item._id === product._id) {
        item.count++;
        alreadyInCart = true;
      }
    })
    if (!alreadyInCart) {
      cartItem.push({ ...product, count: 1 });
    }

    setCartItem(cartItem);
    localStorage.setItem('cartItem', JSON.stringify(cartItem))
  }


  /////////////////////////////////////////////////////////

  const removeCart = (product) => {
    const itemData = cartItems.filter(item => item._id !== product._id)
    setCartItem(itemData);
    localStorage.setItem('cartItem', JSON.stringify(itemData))
  }

  /////////////////////////////////////////////////////////

  const createOrderCart = (order) => {

  }

  /////////////////////////////////////////////////////////

  const sortProducts = (event) => {
    const sort = event.target.value
    const product = products.products;
    setProducte((state) => ({
      sort: sort,
      products: product.slice().sort((a, b) =>
        sort === "lowest" ? a.price > b.price ? 1 : - 1 :
          sort === "hightest" ? a.price < b.price ? 1 : -1 :
            a._id > b._id ? 1 : -1
      )
    }))

  }
  /////////////////////////////////////////////////////////
  const filterProducts = (event) => {

    const product = products.products;


    if (event.target.value === "") {
      setProducte({ size: event.target.value, products: data.products })
    } else {
      setProducte({
        size: event.target.value,
        products: product.filter(prods => prods.availableSizes.indexOf(event.target.value) >= 0)
      })
    }
  }

  /////////////////////////////////////////////////////////
  return (
    <Provider store={store}>
    <div className='grid-container'>
      <header>
        <a href='/'>React Shopping Cart</a>
      </header>
      <main>
        <div className='content'>
          <div className='main'>
            <Filter
              count={products.products.length}
              size={products.size}
              sort={products.sort}
              filterProducts={filterProducts}
              sortProducts={sortProducts}
            />

            <Product props={products} addToCart={addToCart} />
          </div>
          <div className='sidebar'>
            <Cart cartItem={cartItems} removeCart={removeCart} createOrderCart={createOrderCart} />
          </div>
        </div>
      </main>
      <footer>All right is reserved</footer>
    </div>
    </Provider>
  );
}

export default App;
