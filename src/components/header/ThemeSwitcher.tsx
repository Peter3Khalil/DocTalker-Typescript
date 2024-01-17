import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdDarkMode, MdLightMode } from '../shared/Icons';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { AppDispatch, RootState } from '@/redux/store';
import { toggleTheme } from '@/redux/slices/theme';
const ThemeSwitcher = () => {
  const { mode } = useSelector((state: RootState) => state.theme);
  const dispatch: AppDispatch = useDispatch();
  return (
    <Tippy content={mode == 'light' ? 'Dark Mode' : 'Light Mode'}>
      <button
        className="relative text-2xl"
        onClick={() => dispatch(toggleTheme())}
      >
        {mode == 'light' ? <MdDarkMode /> : <MdLightMode />}
      </button>
    </Tippy>
  );
};

export default ThemeSwitcher;
