import React, { useContext,  useEffect,  useState } from 'react'
import "./PlaceOrder.css"
import { StoreContext } from '../../Context/Context'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const PlaceOrder = () => {
  const {getTotalCartAmount,token,food_list,cartItems,url1}=useContext(StoreContext)
  const [data, setData] = useState({
    firstName:"",
    lastName:"",
    email:"",
    street:"",
    city:"",
    state:"",
    zipcode:"",
    country:"",
    phone:""
  })

  const onChangeHandler =(event)=>{
    const name=event.target.name;
    const value =event.target.value;
    setData(data=>({...data,[name]:value}))
  }

 const placeOrder =async(event)=>{
  event.preventDefault();
  let orderItems=[];
  food_list.map((item)=>{
    if(cartItems[item._id]>0){
      let itemInfo =item;
      itemInfo["quantity"]= cartItems[item._id];
      orderItems.push(itemInfo)
    }
  })
  let orderData={
    address:data,
    items:orderItems,
    amount:getTotalCartAmount()+2,
  }
  let response = await axios.post(url1+"/api/order/place",orderData,{headers:{token}})
  if(response.data.success){
    const {session_url}=response.data;
    window.location.replace(session_url);
  }
  else{
    console.error(response.data.message)
    alert("Error");
  }
 }

 const navigate =useNavigate()
 useEffect(()=>{
  if(!token){
    navigate('/cart')
  }
  else if(getTotalCartAmount()==-0)
  {
    navigate('/cart')
  }
 },[token])
  
  return (
    <form action="" className='place-order'onSubmit={placeOrder}>
      <div className="place-order-left">
        <p className='title'>Delivery Information</p>
        <div className="multi-fields">
          <input required onChange={onChangeHandler} name='firstName' value={data.firstName} type="text" placeholder='First Name' />
          <input required onChange={onChangeHandler} name='lastName' value={data.lastName}type="text" placeholder='Last Name' />
        </div>
        <input required onChange={onChangeHandler} name='email' value={data.email} type="email" placeholder='Email Address' />
        <input required onChange={onChangeHandler} name='street' value={data.street}  type="input" placeholder='Street' />
        <div className="multi-fields">
          <input required onChange={onChangeHandler} name='city' value={data.city}  type="text" placeholder='city' />
          <input required onChange={onChangeHandler} name='state' value={data.state}  type="text" placeholder='State' />
        </div>
        <div className="multi-fields">
          <input required onChange={onChangeHandler} name='zipcode' value={data.zipcode}  type="text" placeholder='Zip Code' />
          <input required onChange={onChangeHandler} name='country' value={data.country}  type="text" placeholder='Country' />
        </div>
        <input required onChange={onChangeHandler} name='phone' value={data.phone}  type="text" placeholder='phone' />
      </div>
      <div className="place-order-right">
      <div className="cart-total">
          <h2>Cart Totals</h2>
            <div>
              <div className="cart-total-details">
                <p>Subtotal</p>
                <p>${getTotalCartAmount()}</p>
              </div>
              <div className="cart-total-details">
                <p>Delivery Fee</p>
                <p>${2}</p>
              </div>
              <div className="cart-total-details">
                <b>Total</b>
                <b>
                ${getTotalCartAmount()+2}
                </b>
              </div>

            </div>
            <button type='submit'>PROCEED TO PAYMENT </button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder