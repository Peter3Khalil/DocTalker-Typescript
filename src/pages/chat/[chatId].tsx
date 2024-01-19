import React, {  useEffect, useRef, useState } from "react"
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



// Handle Navigation with taps
const mainContainerRef = useRef(null)
const observerRef = useRef(null)

useEffect(() => {
  const mainContainer = mainContainerRef.current
  const children = mainContainer? Array.from(mainContainer.children):null

  observerRef.current = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          document.querySelector("#pdfTap").classList.remove("visible")
          if (entry.target.id === "chat") {
            const chatTap = document.querySelector("#chatTap")
            chatTap.classList.add("visible")
          } else {
            document.querySelector("#chatTap").classList.remove("visible")
            const pdfTap = document.querySelector("#pdfTap")
            pdfTap.classList.add("visible")
          }
        }
      })
    },
    { root: mainContainer, threshold: 0.5 },
  )

  children?.forEach((child) => observerRef.current.observe(child))

  return () => {
    if (observerRef.current) {
      children?.forEach((child) => observerRef.current.unobserve(child))
    }
  }
}, [mainContainerRef.current])
const goToChat = () => {
  mainContainerRef.current.scrollTo({ left: 0, behavior: "smooth" })
}
const goToPDF = () => {
  mainContainerRef.current.scrollTo({
    left: mainContainerRef.current.offsetWidth,
    behavior: "smooth",
  })
}


useEffect(() => {
  if(res){
    setData(res)
    dispatch(setMessages(res.messages))
    
  }
}, [res])


//TODO: Make it mobile responsive
  return (
    <DashboardLayout>
      <nav className="flex h-10 w-full shrink-0 items-center lg:hidden">
        <div
          id="chatTap"
          onClick={goToChat}
          className="flex h-full w-full cursor-pointer items-center justify-center border-r border-foreground/30 bg-muted px-4 text-muted-foreground"
        >
          Chat
        </div>
        <div
          id="pdfTap"
          onClick={goToPDF}
          className="flex h-full w-full cursor-pointer items-center justify-center bg-muted px-4 text-muted-foreground"
        >
          PDF
        </div>
      </nav>

      <main
        id="main"
        ref={mainContainerRef}
        className="flex h-full w-full snap-x snap-mandatory overflow-x-scroll bg-background text-accent-foreground lg:snap-none lg:overflow-hidden"
      >
        <ChatContainer />
        <PDFViewer url={data?.url} />
      </main>
    </DashboardLayout>
  )
}

export default Chat
