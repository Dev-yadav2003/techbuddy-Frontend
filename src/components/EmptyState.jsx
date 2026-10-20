const EmptyState = ({ image, title, text, children }) => (
  <div className="flex flex-col items-center text-center gap-4 py-10">
    {image && (
      <img alt="" src={image} className="w-56 h-56 object-contain opacity-90" />
    )}
    <h2 className="text-2xl font-bold">{title}</h2>
    {text && <p className="text-base-content/60 max-w-sm">{text}</p>}
    {children}
  </div>
);

export default EmptyState;
