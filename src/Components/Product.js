import React, { useEffect, useState } from 'react'
import imagecard from '../Images/img card.jpg'
import './Product.css'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import Cart from './Cart'

function Product({ cart, setcart }) {

    const [Product, setProduct] = useState([])
    const Navigate = useNavigate()

    const fetchProduct = () => {
        axios.get('https://660030b3df565f1a6145f0af.mockapi.io/Product').then((res) => {
            setProduct(res.data);
        }).catch((err) => {
            console.log(err);
        })
    }

    useEffect(() => {
        fetchProduct()
    }, [])

    const AddToCart = (data) => {
        axios.post('https://660030b3df565f1a6145f0af.mockapi.io/cart', data).then((res) => {
            console.log(res);
            setcart([...cart, data])
            toast.success("Add To Cart")
        }).catch((err) => {
            console.log(err);
        })
    }

    const Puynow = (data) => {
        axios.post('https://660030b3df565f1a6145f0af.mockapi.io/cart', data).then((res) => {
            console.log(res);
            setcart([...cart, data])
            toast.success("Puy To Payment")
        }).catch((err) => {
            console.log(err);
        })
    }

    return (
        <div className='container-fluid product-style'>
            <div className='container'>
                <h1 className='py-4 '>Our Products</h1>
                <div className='row'>
                    {
                        Product.map((list) => {
                            return <div className='col-sm-12 col-md-6 col-lg-4 col-xl-4 my-3'>
                                <div class="card p-3 Product-card" style={{ width: "18rem;" }}>
                                    <img src={list.Image} class="card-img-top" alt="..." />
                                    <div class="card-body">
                                        <h5 class="card-title">{list.Product_name}</h5>
                                        <h6 className='text-decoration-line-through text-muted'>{list.Price}</h6>
                                        <h6 className='text-capitalize text-success'>{list.OfferPrice}</h6>
                                        <h6><span class="badge text-bg-success">{list.Rating}<i class="fa fa-star" aria-hidden="true"></i>
                                        </span></h6>
                                        <p class="card-text">{list.Description}</p>
                                        <div className='btn-style d-flex justify-content-between align-items-center'>
                                            <button className='product-btn' onClick={() => AddToCart(list)}><i class="fa fa-shopping-cart mx-2" aria-hidden="true"
                                            ></i>
                                                add to cart</button>
                                            <button className='Product-buy-button'
                                                onClick={() => Navigate('/Checkout', Puynow(list))}
                                            ><i class="fa fa-bolt mx-2" aria-hidden="true"
                                            ></i>
                                                buy now</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        })
                    }

                </div>
            </div>
        </div>
    )
}

export default Product 