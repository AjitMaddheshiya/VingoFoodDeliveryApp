import axios from 'axios'
import React, { useEffect } from 'react'
import { serverUrl } from '../App'
import { useDispatch, useSelector } from 'react-redux'
import { setItemsInMyCity, setShopsInMyCity, setUserData } from '../redux/userSlice'

function useGetItemsByCity() {
    const dispatch=useDispatch()
    const {currentCity}=useSelector(state=>state.user)
  useEffect(()=>{
    if (!currentCity) return
  const fetchItems=async () => {
    try {
           const result=await axios.get(`${serverUrl}/api/item/get-by-city/${encodeURIComponent(currentCity)}`,{withCredentials:true})
            const data = result.data
            if (data && typeof data === 'object' && Array.isArray(data.shops) && Array.isArray(data.items)) {
              dispatch(setShopsInMyCity(data.shops))
              dispatch(setItemsInMyCity(data.items))
            } else if (Array.isArray(data)) {
              dispatch(setItemsInMyCity(data))
            } else {
              dispatch(setItemsInMyCity([]))
            }
    } catch (error) {
        console.log(error)
    }
}
fetchItems()
 
  },[currentCity])
}

export default useGetItemsByCity
