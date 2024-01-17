import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RiMenu2Fill } from '../shared/Icons';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { AppDispatch, RootState } from '@/redux/store';
import { toggleSidebar } from '@/redux/slices/sidebar';
const MenuComponent = () => {
  const dispatch: AppDispatch = useDispatch();
  const { isOpened } = useSelector((state: RootState) => state.sidebar);
  return (
    <Tippy content={isOpened ? 'Close Sidebar' : 'Open Sidebar'}>
      <button className="text-2xl" onClick={() => dispatch(toggleSidebar())}>
        <RiMenu2Fill />
      </button>
    </Tippy>
  );
};
export default MenuComponent;
