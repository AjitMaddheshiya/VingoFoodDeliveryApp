import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import ForgotPassword from './pages/ForgotPassword'
import useGetCurrentUser from './hooks/useGetCurrentUser'
import { useDispatch, useSelector } from 'react-redux'
import Home from './pages/Home'
import useGetCity from './hooks/useGetCity'
import useGetMyshop from './hooks/useGetMyShop'
import CreateEditShop from './pages/CreateEditShop'
import AddItem from './pages/AddItem'
import EditItem from './pages/EditItem'
import useGetShopByCity from './hooks/useGetShopByCity'
import useGetItemsByCity from './hooks/useGetItemsByCity'
import CartPage from './pages/CartPage'
import CheckOut from './pages/CheckOut'
import OrderPlaced from './pages/OrderPlaced'
import MyOrders from './pages/MyOrders'
import useGetMyOrders from './hooks/useGetMyOrders'
import useUpdateLocation from './hooks/useUpdateLocation'
import TrackOrderPage from './pages/TrackOrderPage'
import Shop from './pages/Shop'
import { useEffect } from 'react'
import axios from 'axios'
import { io } from 'socket.io-client'
import { setSocket, setCurrentCity, setCurrentState, setCurrentAddress, setShopsInMyCity, setItemsInMyCity } from './redux/userSlice'
import { setLocation, setAddress as setMapAddress } from './redux/mapSlice'

export const serverUrl="http://localhost:8000"
function App() {
    const {userData, currentCity}=useSelector(state=>state.user)
    const dispatch=useDispatch()
  useGetCurrentUser()
useUpdateLocation()
  useGetCity()
  useGetMyshop()
  useGetShopByCity()
  useGetItemsByCity()
  useGetMyOrders()

  // Set currentCity from userData.location on login
  useEffect(() => {
    const setUserCity = async () => {
      if (userData && !currentCity && userData.location && userData.location.coordinates && userData.location.coordinates.length === 2) {
        const lat = userData.location.coordinates[1]
        const lon = userData.location.coordinates[0]
        dispatch(setLocation({ lat, lon }))
        try {
          const apiKey = import.meta.env.VITE_GEOAPIKEY
          const result = await axios.get(`https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&format=json&apiKey=${apiKey}`)
          const geoData = result?.data?.results[0]
          if (geoData) {
            dispatch(setCurrentCity(geoData.city || geoData.county))
            dispatch(setCurrentState(geoData.state))
            dispatch(setCurrentAddress(geoData.address_line2 || geoData.address_line1))
            dispatch(setMapAddress(geoData.address_line2))
            // Clear to refetch
            dispatch(setShopsInMyCity([]))
            dispatch(setItemsInMyCity([]))
          }
        } catch (error) {
          console.log('Geoapify error:', error)
        }
      }
    }
    setUserCity()
  }, [userData, currentCity, dispatch])

  useEffect(()=>{
const socketInstance=io(serverUrl,{withCredentials:true})
dispatch(setSocket(socketInstance))
socketInstance.on('connect',()=>{
if(userData){
  socketInstance.emit('identity',{userId:userData._id})
}
})
return ()=>{
  socketInstance.disconnect()
}
  },[userData?._id])

  return (
   <Routes>
    <Route path='/signup' element={!userData?<SignUp/>:<Navigate to={"/"}/>}/>
    <Route path='/signin' element={!userData?<SignIn/>:<Navigate to={"/"}/>}/>
      <Route path='/forgot-password' element={!userData?<ForgotPassword/>:<Navigate to={"/"}/>}/>
      <Route path='/' element={userData?<Home/>:<Navigate to={"/signin"}/>}/>
<Route path='/create-edit-shop' element={userData?<CreateEditShop/>:<Navigate to={"/signin"}/>}/>
<Route path='/add-item' element={userData?<AddItem/>:<Navigate to={"/signin"}/>}/>
<Route path='/edit-item/:itemId' element={userData?<EditItem/>:<Navigate to={"/signin"}/>}/>
<Route path='/cart' element={userData?<CartPage/>:<Navigate to={"/signin"}/>}/>
<Route path='/checkout' element={userData?<CheckOut/>:<Navigate to={"/signin"}/>}/>
<Route path='/order-placed' element={userData?<OrderPlaced/>:<Navigate to={"/signin"}/>}/>
<Route path='/my-orders' element={userData?<MyOrders/>:<Navigate to={"/signin"}/>}/>
<Route path='/track-order/:orderId' element={userData?<TrackOrderPage/>:<Navigate to={"/signin"}/>}/>
<Route path='/shop/:shopId' element={userData?<Shop/>:<Navigate to={"/signin"}/>}/>
   </Routes>
  )
}

export default App
