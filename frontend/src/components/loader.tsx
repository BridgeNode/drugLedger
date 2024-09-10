import React from 'react';

const Loader = () => {
   return (
      <div className="flex items-center justify-center h-[1.25rem] w-[1.25rem] mx-2">
         <div className="w-[1.25rem] h-[1.25rem] border-4 border-blue-200 border-dotted rounded-full animate-spin"></div>
      </div>
   );
};

export default Loader;
