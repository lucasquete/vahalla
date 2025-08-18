const Loading = () => {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-[#0d0a1a] text-cyan-300 font-pixel scanlines">
      <div className="animate-pulse text-2xl tracking-widest text-center">
        LOADING...
      </div>
      <div className="mt-4 w-50 sm:w-64 h-2 bg-purple-900 rounded-full overflow-hidden">
        <div className="h-full bg-cyan-300 w-full animate-[wiggle_1.5s_ease-in-out_infinite] rounded-full"></div>
      </div>
      <style>{`
          @keyframes wiggle {
            0%, 100% { transform: translateX(-100%); }
            50% { transform: translateX(100%); }
          }
        `}</style>
    </div>
  );
};

export default Loading;
