import React, { useContext, useState } from 'react'
import UserContext from './Context/Context'
import toast from 'react-hot-toast'


function Checkout() {
    const Cartdata = useContext(UserContext)
    const CartTotal = Cartdata.reduce((prev, curr) => prev + Number(curr.OfferPrice), 0)
    const [carddetails, setCarddetails] = useState({
        cardnumber: "",
        name: "",
        date: "",
        number: ""
    })

    const handlechange = (e, name) => {
        let value = e.target.value
        setCarddetails({ ...carddetails, [name]: value })
    }

    const handlesubmit = () => {
        if (carddetails.cardnumber === "") {
            return alert("Card Number Required")
        }
        if (carddetails.cardnumber.length < 15) {
            return alert("Min 16 Number Required")
        }
        if (carddetails.name === "") {
            return alert("Name Required")
        }
        if (carddetails.name.length < 3) {
            return alert("Min 16 Number Required")
        }
        if (carddetails.date === "") {
            return alert("Experied Date Required")
        }
        if (carddetails.number === "") {
            return alert("CVV Required")
        }
        if (carddetails.name.length < 2) {
            return alert("3 Number Required")
        }
        toast.success("success")
        console.log(carddetails);
        setCarddetails({
            cardnumber: "",
            name: "",
            date: "",
            number: ""
        })

    }



    return (
        <div className='container '>
            <div className='row my-5'>
                <div className='col-sm-12 col-md-12 col-lg-8 col-xl-8'>
                    <h4>Card Details</h4>
                    <div class="card w-75 creditcard-style">
                        <div class="card-body">
                            <div className='row '>
                                <div className='col-12 fw-bold'>
                                    <div className='mb-3'>
                                        <label class="form-label">Card Number</label>
                                        <input type="Number"
                                            maxLength={16}
                                            placeholder='1234 6543 9876 0033'
                                            class="form-control"
                                            value={carddetails.cardnumber}
                                            onChange={(e) => handlechange(e, "cardnumber")} />
                                    </div>
                                </div>
                                <div className='col-12 fw-bold'>
                                    <div className='mb-3'>
                                        <label class="form-label">Card Holder Name</label>
                                        <input type="text"
                                            placeholder='Enter Name'
                                            class="form-control"
                                            value={carddetails.name}
                                            onChange={(e) => handlechange(e, "name")} />
                                    </div>
                                </div>
                                <div className='col-6 fw-bold'>
                                    <div className='mb-3'>
                                        <label class="form-label">Expiry Date</label>
                                        <input type="number"
                                            placeholder='MM/YY'
                                            class="form-control"
                                            value={carddetails.date}
                                            onChange={(e) => handlechange(e, "date")} />
                                    </div>
                                </div>
                                <div className='col-6 fw-bold'>
                                    <div className='mb-3'>
                                        <label class="form-label">CVV</label>
                                        <input type="number"
                                            placeholder='000'
                                            class="form-control"
                                            value={carddetails.number}
                                            onChange={(e) => handlechange(e, "number")} />
                                    </div>
                                </div>
                                <button className='btn btn-sm btn-outline-success fw-bold'
                                    onClick={() => handlesubmit()}
                                >Pay Now ${CartTotal}</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-sm-12 col-md-12 col-lg-4 col-xl-4 my-5'> <div class="card" >
                    <div class="card-body payment-card">
                        <h5 class="card-title">Payments</h5>
                        <div class="card">
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item "><div className='d-flex justify-content-between align-items-center'><h5 className='text-muted'>Items In Cart</h5><h5>{Cartdata.length}</h5></div></li>
                                <li class="list-group-item"><div className='d-flex justify-content-between align-items-center'><h5 className='text-muted'>Subtotal</h5><h5>${CartTotal}</h5></div></li>
                                <li class="list-group-item"><div className='d-flex justify-content-between align-items-center'><h5 className='text-muted'>Delivery Charges</h5><h5 className='text-success'>Free</h5></div></li>
                                <li class="list-group-item"><div className='d-flex justify-content-between align-items-center'><h5 className='text-muted'>Total</h5><h5>${CartTotal}</h5></div></li>
                            </ul>
                        </div>
                    </div>
                </div></div>
            </div>
        </div>
    )
}

export default Checkout