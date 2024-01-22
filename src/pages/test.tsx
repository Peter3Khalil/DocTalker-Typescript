// Import React and Tailwind CSS
import useObserver from '@/hooks/useObserver';
import React, { useEffect } from 'react';

// Define the ScrollContainer component
const ScrollContainer = () => {
  const { visibleElement } = useObserver({ parentId: 'parent' });
  useEffect(() => {
    if (visibleElement) {
      console.log(visibleElement);
    }
  }, [visibleElement]);
  return (
    <div
      id="parent"
      className="whitespace-no-wrap flex snap-x snap-mandatory overflow-x-scroll"
    >
      {/* Scroll items */}
      <div className="h-screen w-screen flex-none snap-start border-2 border-gray-300 p-8">
        Item 1
      </div>
      <div className="h-screen w-screen flex-none snap-start border-2 border-gray-300 p-8">
        Item 2
      </div>
      <div className="h-screen w-screen flex-none snap-start border-2 border-gray-300 p-8">
        Item 3
      </div>
      {/* Add more items as needed */}
    </div>
  );
};

// Export the component
export default ScrollContainer;
