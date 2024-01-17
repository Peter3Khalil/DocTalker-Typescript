import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cn } from '../utils/helperFunctions';
import { closeModal } from '../redux/slices/modal';
import Button from './shared/Button';
const Modal = () => {
  const dispatch = useDispatch();
  const isModalOpen = useSelector((state) => state.modal.isOpen);
  return (
    <>
      {isModalOpen && (
        <div className={cn('fixed z-10 h-screen w-[100vw]')}>
          {/* Overlay */}
          <div
            onClick={() => dispatch(closeModal())}
            className="z-10 h-full w-full bg-foreground/50 dark:bg-background/50"
          ></div>
          {/* Modal */}
          <ModalBox />
        </div>
      )}
    </>
  );
};
const ModalBox = () => {
  const dispatch = useDispatch();
  const [activeTap, setActiveTap] = useState('general');
  const navigation = {
    general: [
      {
        name: 'Theme',
        value: 'Light',
      },
      {
        name: 'Delete all chats',
        value: (
          <Button className="w-fit bg-destructive px-4 font-bold text-destructive-foreground hover:bg-destructive">
            Delete all
          </Button>
        ),
      },
    ],
    profile: [
      {
        name: 'Username',
        value: 'John Doe',
      },
      {
        name: 'Phone',
        value: '+91 9876543210',
      },
      {
        name: 'Email',
        value:
          'peter@gmail.competer@gmail.competer@gmail.competer@gmail.competer@gmail.competer@gmail.competer@gmail.competer@gmail.competer@gmail.competer@gmail.com',
      },
    ],
  };
  return (
    <div className="absolute left-1/2 top-1/2 z-20 flex h-[300px] w-[600px] -translate-x-1/2 -translate-y-1/2  transform flex-col gap-3 rounded bg-muted ">
      <div className="flex h-14 w-full shrink-0 items-center justify-between border-b dark:border-foreground/20">
        <h1 className="px-4 text-xl font-bold ">Setting</h1>
        <button
          onClick={() => dispatch(closeModal())}
          className="px-4  text-lg"
        >
          X
        </button>
      </div>

      <div className="grid h-full w-full grid-cols-3 text-sm">
        <div className="col-span-1 flex flex-col gap-2 px-3 font-bold">
          <button
            onClick={() => setActiveTap('general')}
            className={cn('w-full rounded p-1 px-2 hover:bg-foreground/10', {
              'bg-foreground/10': activeTap === 'general',
            })}
          >
            General
          </button>
          <button
            onClick={() => setActiveTap('profile')}
            className={cn('w-full rounded p-1 px-2 hover:bg-foreground/10', {
              'bg-foreground/10': activeTap === 'profile',
            })}
          >
            Profile
          </button>
        </div>
        <div className="col-span-2 flex flex-col px-2 pr-6">
          {navigation[activeTap].map((item, index) => (
            <div
              className={cn(
                'flex w-full items-center justify-between gap-12 border-b py-4 dark:border-foreground/20',
                {
                  'border-none': index === navigation[activeTap].length - 1,
                },
              )}
            >
              <h3>{item.name}</h3>
              <p className="overflow-hidden text-ellipsis whitespace-nowrap break-all">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Modal;
