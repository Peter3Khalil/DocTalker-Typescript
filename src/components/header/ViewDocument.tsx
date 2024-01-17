import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IoEyeSharp, IoEyeOff } from '../shared/Icons';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { toggleDocument } from '@/redux/slices/document';
import { RootState } from '@/redux/store';
const ViewDocument = () => {
  const { isOpened } = useSelector((state: RootState) => state.document);
  const dispatch = useDispatch();
  return (
    <Tippy content={isOpened ? 'Hide Document' : 'View Document'}>
      <button
        className="relative hidden text-2xl lg:block"
        onClick={() => dispatch(toggleDocument())}
      >
        {isOpened ? <IoEyeOff /> : <IoEyeSharp />}
      </button>
    </Tippy>
  );
};

export default ViewDocument;
