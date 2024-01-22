import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import ChatContainer from '@/components/chat/ChatContainer';
import PDFViewer from '@/components/chat/PDFViewer';
import DashboardLayout from '@/components/Layouts/DashboardLayout';
import { useDispatch } from 'react-redux';
import { setMessages } from '@/redux/slices/messages';
import client from '@/utils/axios-util';
import { useQuery } from 'react-query';
import { cn } from '@/utils/helperFunctions';
const fetchChat = (chatId: string | undefined | string[]) => {
  return client.get(`/chat/${chatId}`);
};
const Chat = () => {
  const router = useRouter();
  const { chatId } = router.query;
  const [data, setData] = useState(null);
  const { data: res } = useQuery(['chat', chatId], () => fetchChat(chatId));
  const dispatch = useDispatch();
  const chatRef = useRef(null);
  const pdfRef = useRef(null);
  const [activeTap,setActiveTap] = useState<null | string>(null)
  useEffect(() => {
    if (res) {
      setData(res);
      dispatch(setMessages(res.messages));
    }
  }, [res]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const {id} = entry.target
            setActiveTap(id)
          }
        });
      },
      { threshold: 0.5 }, // Adjust this value as needed
    );

    if (chatRef.current) {
      observer.observe(chatRef.current);
    }

    if (pdfRef.current) {
      observer.observe(pdfRef.current);
    }

    return () => {
      if (chatRef.current) {
        observer.unobserve(chatRef.current);
      }

      if (pdfRef.current) {
        observer.unobserve(pdfRef.current);
      }
    };
  }, []);

  //TODO: Make it mobile responsive
  return (
    <DashboardLayout>
      <nav className="flex h-16 w-full bg-accent text-accent-foreground lg:hidden">
        <div className={cn("flex flex-1 cursor-pointer items-center justify-center border-r-2",{
          "border-b-primary border-b-2":activeTap==="chat"
        })}>
          Chat
        </div>
        <div className={cn("flex flex-1 cursor-pointer items-center justify-center border-r-2",{
          "border-b-primary border-b-2":activeTap==="pdf"
        })}>
          PDF
        </div>
      </nav>
      <main
        id="main"
        className="whitespace-no-wrap flex h-full w-full snap-x snap-mandatory overflow-x-scroll bg-background text-accent-foreground lg:snap-none lg:overflow-hidden"
      >
        <ChatContainer
          ref={chatRef}
          className="w-full flex-none snap-start lg:w-auto lg:flex-1"
        />
        <PDFViewer
          ref={pdfRef}
          className="w-full flex-none snap-start lg:w-auto lg:flex-1"
          url={data?.url}
        />
      </main>
    </DashboardLayout>
  );
};

export default Chat;
