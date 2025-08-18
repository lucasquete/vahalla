
const Error = ({error}) => {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-[#0d0a1a] text-red-500 font-pixel scanlines p-8">
      <div className="border-2 border-red-500 p-8 text-center bg-black bg-opacity-50">
        <h2 className="text-2xl mb-4 flicker-slow">CONNECTION FAILED</h2>
        <p>{error}</p>
      </div>
    </div>
  );
};

export default Error;
