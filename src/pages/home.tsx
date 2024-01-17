import React, { useEffect } from 'react'
import client from '@/utils/axios-util'

const Home = () => {
  useEffect(() => {
    client.post("/user/signup",{
      "email":"peter@gmail.com",
      "password":"",
      "firstName":"",
      "lastName":"",
    }).then((res) => {
      console.log(res)
    }).catch((err) => {
      console.log(err)
    })
  }, [])
  return (
    <div>Home</div>
  )
}

export default Home