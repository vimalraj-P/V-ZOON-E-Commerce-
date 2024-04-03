import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import UserContext from './Context/Context'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import toast from 'react-hot-toast'


function Topbor() {
  const Navigate = useNavigate()
  const CartTotal = useContext(UserContext)
  const [cart, setCart] = useState([])
  const [Loginsignup, setLoginsigmup] = useState(false)
  const [action, setAction] = useState("Login")




  const fetchCart = () => {
    axios.get('https://660030b3df565f1a6145f0af.mockapi.io/cart').then((res) => {
      setCart(res.data);
    }).catch((err) => {
      console.log(err);
    })
  }

  useEffect(() => {
    fetchCart()
  }, [])

  const login = () => {
    setLoginsigmup(!Loginsignup)
  }


  const [Details, setDetails] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handlechange = (e, name) => {
    let value = e.target.value
    setDetails({ ...Details, [name]: value })
  }

  const handlesubmit = () => {

    if (Details.email === "") {
      return alert("email requird")
    }
    if (Details.password === "") {
      return alert("password requird")
    }
    toast.success("success")
    console.log(Details);
    setDetails({
      name: "",
      email: "",
      password: ""
    })
  }


  return (
    <div>
      <nav class="navbar ">
        <div class="container-fluid">
          <div className='navbar-texts'>
            <h1 className='v-text'>V</h1>
            <h3 className='z-text m-2'>Zoon</h3>
            <div >
              <input className='search' type='search' placeholder='Search Product'></input>
            </div>
            <button className='topbor-btn mx-2' onClick={() => Navigate('/')}><i class="fa fa-home" aria-hidden="true"></i>
              Home</button>
            <button className='topbor-btn mx-2' onClick={() => login()}><i class="fa fa-user-circle  mx-1" aria-hidden="true"></i>Login
            </button>
            <button className='topbor-btn mx-2' onClick={() => Navigate('/Cart')}><i class="fa fa-cart-arrow-down mx-2" aria-hidden="true"></i>
              <span class="badge text-bg-success">{CartTotal.length}</span>
            </button>
          </div>
        </div>
      </nav>
      <Modal className='container col-sm-12 col-md-12 col-lg-12 col-xl-12' isOpen={Loginsignup} toggle={() => setLoginsigmup(!Loginsignup)} size='lg' centered>
        <ModalHeader className='header ' toggle={() => setLoginsigmup(!Loginsignup)}><div className='text'>{action}</div>
        </ModalHeader>
        <ModalBody>
          <div className='inputs' >
            {action === "Login" ? <div></div> : <div className='input'>
              <i class="fa fa-user-circle" aria-hidden="true"></i>
              <input type='text' placeholder='Name'
                maxLength={12}
                value={Details.name}
                onChange={(e) => handlechange(e, "name")} />
            </div>}

            <div className='input' >
              <i class="fa fa-envelope" aria-hidden="true"></i>
              <input type='Email' placeholder='Email id'
                maxLength={30}
                value={Details.email}
                onChange={(e) => handlechange(e, "email")} />
            </div>
            <div className='input'>
              <i class="fa fa-key" aria-hidden="true"></i>
              <input type='password' placeholder='Password'
                maxLength={10}
                value={Details.password}
                onChange={(e) => handlechange(e, "password")} />
            </div>
            {action === "Sign up" ? <div></div> : <div className='forgot-password'>Lost password <span>Click Here!</span></div>}

          </div>
        </ModalBody>
        <ModalFooter className='submit-container' onClick={() => handlesubmit()}>
          <button className={action === "Login" ? "submit gray" : "submit"} onClick={() => { setAction("Sign up") }}>Sign up</button>
          <button className={action === "Sign up" ? "submit gray" : "submit"} onClick={() => { setAction("Login") }}>Login</button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default Topbor