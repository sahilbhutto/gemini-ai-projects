import React from 'react';

interface PropsType {
  children: React.ReactNode;
}

const Container = ({ children }: PropsType) => {
  return (
   <div className="flex pt-14 md:pt-0 h-screen w-full bg-[#050505] overflow-hidden text-neutral-200 antialiased selection:bg-white/10 selection:text-white">
      {children}
    </div>
  );
};

export default Container;