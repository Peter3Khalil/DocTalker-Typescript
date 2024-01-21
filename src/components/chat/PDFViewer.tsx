import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { cn } from '../../utils/helperFunctions';
import { RootState } from '@/redux/store';

type PDFViewerProps = {
  url: string;
};
const PDFViewer: FC<PDFViewerProps> = ({ url }) => {
  const { isOpened } = useSelector((state: RootState) => state.document);
  return (
    <div
      className={cn('h-full flex-1', {
        hidden: !isOpened,
      })}
      id="pdf"
    >
      <iframe
        src={`https://docs.google.com/viewer?url=${url}&embedded=true`}
        title="document"
        className="h-full w-full"
      ></iframe>
    </div>
  );
};

export default PDFViewer;
