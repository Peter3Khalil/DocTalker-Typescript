import React, { use, useEffect, useState } from "react"
import { useRouter } from "next/router"
import ChatContainer from "@/components/chat/ChatContainer"
import PDFViewer from "@/components/chat/PDFViewer"
import { cn } from "@/utils/helperFunctions"
import DashboardLayout from "@/components/Layouts/DashboardLayout"
import axios from "axios"
const fetchChat  = async (chatId) => {
  const token = localStorage.getItem("token")
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
  const { data } = await axios.get(`${baseUrl}/chat/${chatId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return data
}
const Chat = () => {
const router = useRouter()
const [data, setData] = useState(null)
const { chatId } = router.query

useEffect(() => {
  if (!chatId) return
 fetchChat(chatId).then((data) => {
    console.log(data)
    setData(data)
 }).catch(error=>{
    console.log(error)
    router.push("/404")
 })
}, [chatId])
//TODO: Make it mobile responsive
  return (
    <DashboardLayout>
      <main
        className={cn(
          "relative flex h-[20vh] w-full flex-grow justify-center overflow-auto",
        )}
      >
        <ChatContainer />
        <PDFViewer url={data?.url} />
      </main>
    </DashboardLayout>
  )
}

export default Chat
