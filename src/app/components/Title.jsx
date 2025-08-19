const Title = ({ title }) => {
  return (
    <h1
      className="mb-4 font-display text-2xl md:text-4xl font-black text-cyan-300 tracking-widest flicker-slow text-center"
      style={{
        textShadow: "0 0 5px #00ffff, 0 0 10px #00ffff, 0 0 20px #ff00ff",
      }}
    >
      {title}
    </h1>
  );
};

export default Title;
