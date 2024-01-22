import React, {  forwardRef } from 'react';
import { useSelector } from 'react-redux';
import { cn } from '../../utils/helperFunctions';
import { RootState } from '@/redux/store';

type PDFViewerProps = {
  url: string;
  className?: string;
};
const PDFViewer = forwardRef<HTMLDivElement, PDFViewerProps>(({ url, className }, ref) => {
  const { isOpened } = useSelector((state: RootState) => state.document);
  return (
    <div
      className={cn('h-full flex-1', className, {
        "lg:hidden": !isOpened,
      })}
      id="pdf"
      ref={ref}
    >
      <iframe
        src={`https://docs.google.com/viewer?url=${url}&embedded=true`}
        title="document"
        className="h-full w-full"
      ></iframe>
    </div>
  );
});

PDFViewer.displayName = 'PDFViewer';

export default PDFViewer;
