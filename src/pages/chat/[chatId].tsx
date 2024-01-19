import React, {  useEffect, useState } from "react"
import { useRouter } from "next/router"
import ChatContainer from "@/components/chat/ChatContainer"
import PDFViewer from "@/components/chat/PDFViewer"
import { cn } from "@/utils/helperFunctions"
import DashboardLayout from "@/components/Layouts/DashboardLayout"
import axios from "axios"
import { useDispatch } from "react-redux"
import { setMessages } from "@/redux/slices/messages"
import client from "@/utils/axios-util"
import { useQuery } from "react-query"
const fetchChat  =  (chatId) => {
 return client.get(`/chat/${chatId}`)
}
const Chat = () => {
const router = useRouter()
const { chatId } = router.query
const [data, setData] = useState(null)
const {data:res} = useQuery(['chat',chatId],()=> fetchChat(chatId))
const dispatch = useDispatch()

useEffect(() => {
  if(res){
    setData(res)
    dispatch(setMessages(res.messages))
    console.log(res)
  }
}, [res])

//TODO: Make it mobile responsive
  return (
    <DashboardLayout>
      <main
        className={cn(
          "relative flex flex-col lg:flex-row h-[20vh] w-full flex-grow justify-center overflow-auto",
        )}
      >
        <ChatContainer />
        <PDFViewer url={data?.url} />
      </main>
    </DashboardLayout>
  )
}

export default Chat
