import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';


function Cart({headercart,setHeadercart}) {
  const [Cart, setCart] = useState([])
  const Navigate=useNavigate()

  const fetchCart = () => {
    axios.get('https://660030b3df565f1a6145f0af.mockapi.io/cart').then((res) => {
      setCart(res.data);
      setHeadercart(res.data)
    }).catch((err)=>{
      console.log(err);
    })
  }

  useEffect(() => {
    fetchCart()
  },[])

  const Removecart= (id)=>{
    axios.delete(`https://660030b3df565f1a6145f0af.mockapi.io/cart/${id}`).then((res)=>{
       toast.success("Remove") 
       fetchCart()
    }).catch((err)=>{
      console.log(err);
    })
  }

  const CartTotal = Cart.reduce((prev,curr)=>prev+Number(curr.OfferPrice),0)
  return (
    <div className='container w-75 m-auto'>
      <div className='row my-5'>
        <div className='col-sm-12 col-md-12 col-lg-8 col-xl-8'>
          <div class="card" style={{ width: "50rem" }}>
            <ul class="list-group list-group-flush">
              {
                Cart.map((item) => {
                  return <li class="list-group-item card-style">
                    <div className='d-flex justify-content-between align-items-center'>
                      <img src={item.Image} width={'250px'} height={'150px'} />
                      <h3>{item.Product_Name}</h3>
                      {item.OfferPrice}
                      <button className='btn btn-sm btn-outline-danger'onClick={()=>Removecart(item.id)}>Remove</button>
                    </div>
                  </li>
                })
              }

            </ul>
          </div>
        </div>
        <div className='col-sm-12 col-md-12 col-lg-4 col-xl-4'>
          <div class="card payment-card" >
            <div class="card-body ">
              <h5 class="card-title">Payments</h5>
              <div class="card ">
                <ul class="list-group list-group-flush ">
                  <li class="list-group-item "><div className='d-flex justify-content-between align-items-centen'><h5 className='text-muted'>Items In Cart</h5><h5>{Cart.length}</h5></div></li>
                  <li class="list-group-item"><div className='d-flex justify-content-between align-items-center'><h5 className='text-muted'>Subtotal</h5><h5>${CartTotal}</h5></div></li>
                  <li class="list-group-item"><div className='d-flex justify-content-between align-items-center'><h5 className='text-muted'>Delivery Charges</h5><h5 className='text-success'>Free</h5></div></li>
                  <li class="list-group-item"><div className='d-flex justify-content-between align-items-center'><h5 className='text-muted'>Total</h5><h5>${CartTotal}</h5></div></li>
                </ul>
              </div>
            </div>
          </div>
          <div className='text-center'>
              <button className='Proceed-btn my-3' onClick={()=>Navigate('/Checkout')}>Proceed To Payments</button>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Cart