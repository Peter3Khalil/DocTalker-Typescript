// Import React and Tailwind CSS
import React from 'react';

// Define the ScrollContainer component
const ScrollContainer = () => {
  return (
    <div className="flex overflow-x-scroll snap-x snap-mandatory whitespace-no-wrap">
      {/* Scroll items */}
      <div className="flex-none w-screen h-screen snap-start border-2 border-gray-300 p-8">
        Item 1
      </div>
      <div className="flex-none w-screen h-screen snap-start border-2 border-gray-300 p-8">
        Item 2
      </div>
      <div className="flex-none w-screen h-screen snap-start border-2 border-gray-300 p-8">
        Item 3
      </div>
      {/* Add more items as needed */}
    </div>
  );
};

// Export the component
export default ScrollContainer;
