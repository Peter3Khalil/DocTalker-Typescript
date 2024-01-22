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

const fetchChats = () => {
  return client.get('/chat');
};

const Sidebar = () => {
  const { isOpened } = useSelector((state: RootState) => state.sidebar);
  const dispatch: AppDispatch = useDispatch();
  const { data } = useQuery('chats', fetchChats);
  const [chats, setChats] = useState<Chat[]>([]);
  useEffect(() => {
    if (data) {
      setChats(data);
    }
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
