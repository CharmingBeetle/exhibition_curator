const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-[#030711] via-[#050a1f] to-[#090f2e]">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-500 rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-white/80 text-sm">Loading Assemblé...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
