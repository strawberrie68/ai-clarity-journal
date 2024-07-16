const InboxItem = ({ text, icon, status, background }) => {
  return (
    <li className="nav-item py-2">
      <div className="flex justify-between items-center">
        <div className="flex gap-4 items-center flex-grow">
          <div
            className={`flexCenter gap-2 h-9 w-9 rounded-lg ${background} basis-9`}
            aria-label="icon"
          >
            <span>{icon}</span>
          </div>
          <span className="line-clamp-1">{text}</span>
        </div>
        <div className="flexCenter border border-black px-2 py-1 rounded-full h-9 basis-20 shrink-0">
          <span className="text-xs">{status}</span>
        </div>
      </div>
    </li>
  );
};

export default InboxItem;
