import React, { memo, useEffect, useState } from 'react';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { useSelector, useDispatch } from 'react-redux';
import { cn } from '../../utils/helperFunctions';
import Link from 'next/link';
import Button from '../shared/Button';
import ChatList from './ChatList';
import { AppDispatch, RootState } from '@/redux/store';
import { toggleSidebar } from '@/redux/slices/sidebar';
import { Chat } from './ChatItem';
import client from '@/utils/axios-util';
import { useQuery } from 'react-query';
import { FaRegUserCircle } from '@/components/shared/Icons';
const fetchChats = () => {
  return client.get('/chat');
};
const fakeChats: Chat[] = [
  { chatName: 'Chat 1', id: '1' },
  { chatName: 'Chat 2', id: '2' },
  { chatName: 'Chat 3', id: '3' },
  { chatName: 'Chat 4', id: '4' },
  { chatName: 'Chat 5', id: '5' },
  { chatName: 'Chat 6', id: '6' },
  { chatName: 'Chat 7', id: '7' },
  { chatName: 'Chat 8', id: '8' },
  { chatName: 'Chat 9', id: '9' },
  { chatName: 'Chat 10', id: '10' },
  { chatName: 'Chat 11', id: '11' },
  { chatName: 'Chat 12', id: '12' },
  { chatName: 'Chat 13', id: '13' },
  { chatName: 'Chat 14', id: '14' },
  { chatName: 'Chat 15', id: '15' },
  { chatName: 'Chat 16', id: '16' },
  { chatName: 'Chat 17', id: '17' },
  { chatName: 'Chat 18', id: '18' },
];

const Sidebar = () => {
  const { isOpened } = useSelector((state: RootState) => state.sidebar);
  const dispatch: AppDispatch = useDispatch();
  const { data } = useQuery('chats', fetchChats);
  const [chats, setChats] = useState<Chat[]>([]);
  useEffect(() => {
    // if (data) {
    //   setChats(data as unknown as Chat[]);
    // }
    setChats(fakeChats);
  }, [data]);
  return (
    <aside
      className={cn(
        'absolute left-0 top-0 z-10 flex h-full w-full shrink-0 overflow-y-auto overflow-x-hidden transition-transform duration-500 ease-in-out  md:static md:w-[250px]',
        {
          'translate-x-0': isOpened,
          '-translate-x-full md:fixed': !isOpened,
        },
      )}
    >
      {/* Sidebar content */}
      <div
        className={
          'flex h-full flex-1 flex-col overflow-x-hidden whitespace-nowrap bg-foreground pt-3 text-background dark:bg-accent dark:text-accent-foreground '
        }
      >
        <section className="mb-4 w-full shrink-0 px-2">
          <Tippy content={'Create New Chat'}>
            <Link href={'/'}>
              <Button className={'text-md font-bold'}>+ New Chat</Button>
            </Link>
          </Tippy>
        </section>

        <section className=" flex h-full w-full flex-col gap-1 overflow-y-auto pl-2">
          <h2 className="px-2 text-sm font-medium opacity-50">Chats</h2>
          <ChatList chats={chats} />
        </section>

        <section className="flex h-16 shrink-0 items-center border-t bg-transparent p-2">
          <button className="w-full rounded p-2 hover:bg-muted/20 dark:hover:bg-muted-foreground/20 flex gap-2 items-center">
          <FaRegUserCircle className="shrink-0 text-2xl text-muted-foreground" />
            <p className="text-sm font-semibold overflow-hidden">Peter Khalil</p>
          </button>
        </section>
      </div>

      {/* Overlay */}
      <div
        className="h-full w-32 bg-foreground/20 md:hidden"
        onClick={() => dispatch(toggleSidebar())}
      ></div>
    </aside>
  );
};

export default memo(Sidebar);
