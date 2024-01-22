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
import useObserver from '@/hooks/useObserver';
const fetchChat = (chatId: string | undefined | string[]) => {
  return client.get(`/chat/${chatId}`);
};
const Chat = () => {
  const router = useRouter();
  const { chatId } = router.query;
  const [data, setData] = useState(null);
  const { data: res } = useQuery(['chat', chatId], () => fetchChat(chatId));
  const dispatch = useDispatch();
  const { visibleElement, setVisibleElement } = useObserver({
    parentId: 'main',
  });
  const chatRef = useRef<HTMLDivElement>(null);
  const pdfRef = useRef<HTMLDivElement>(null);
  const goToChat = () => {
    pdfRef.current?.classList.remove('visible');
    chatRef.current?.classList.add('visible');
    const parent = document.getElementById('main');
    parent?.scrollTo({left:0,behavior:'smooth'});
  };
  const goToPDF = () => {
    chatRef.current?.classList.remove('visible');
    pdfRef.current?.classList.add('visible');
    const parent = document.getElementById('main');
    parent?.scrollTo({left:parent.scrollWidth,behavior:'smooth'});
  }
  useEffect(() => {
    if (res) {
      setData(res);
      dispatch(setMessages(res.messages));
    }
  }, [res]);
  useEffect(() => {
    if (!visibleElement) return;
    if (visibleElement.id == 'chat') {
      pdfRef.current?.classList.remove('visible');
      chatRef.current?.classList.add('visible');
      console.log('chat');
    }
    if (visibleElement.id == 'pdf') {
      chatRef.current?.classList.remove('visible');
      pdfRef.current?.classList.add('visible');
      console.log('pdf');
    }
  }, [visibleElement]);
  return (
    <DashboardLayout>
      <nav className="flex h-16 w-full bg-accent text-accent-foreground lg:hidden">
        <div
          ref={chatRef}
          className={cn(
            'flex flex-1 cursor-pointer items-center justify-center border-r-2',
          )}
          onClick={goToChat}
        >
          Chat
        </div>
        <div
          ref={pdfRef}
          className={cn(
            'flex flex-1 cursor-pointer items-center justify-center border-r-2',
          )}
          onClick={goToPDF}
        >
          PDF
        </div>
      </nav>
      <main
        id="main"
        className="whitespace-no-wrap flex h-full w-full snap-x snap-mandatory overflow-x-scroll bg-background text-accent-foreground lg:snap-none lg:overflow-hidden"
      >
        <ChatContainer className="w-full flex-none snap-start lg:w-auto lg:flex-1" />
        <PDFViewer
          className="w-full flex-none snap-start lg:w-auto lg:flex-1"
          url={data?.url}
        />
      </main>
    </DashboardLayout>
  );
};

export default Chat;
