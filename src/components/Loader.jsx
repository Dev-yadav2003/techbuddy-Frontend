const Loader = ({ label = "Loading..." }) => (
  <div className="flex flex-col items-center justify-center gap-3 py-20 text-base-content/60">
    <span className="loading loading-spinner loading-lg text-primary"></span>
    <span className="text-sm">{label}</span>
  </div>
);

export default Loader;
