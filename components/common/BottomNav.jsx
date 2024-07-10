const BottomNav = () => {
  const flexCenter = "flex justify-center items-center";

  return (
    <div className="bottom-nav sticky mx-auto bottom-4 rounded-full h-20 bg-black  max-w-screen-sm sm:w-10/12 sm:px-12 px-6 content-center">
      <ul className="flex justify-between items-center">
        <li className="py-2">
          <div className="flex items-center gap-2 flex-col">
            <img src="/calendar-dots-white.svg" alt="Inbox" />
            <p className="text-white text-sm">Inbox</p>
          </div>
        </li>
        <li className="py-2">
          <div className="flex items-center gap-2 flex-col">
            <img src="/explore-white.svg" alt="Explore" />
            <p className="text-white text-sm">Explore</p>
          </div>
        </li>
        <li className="py-2">
          <div
            className={`flex bg-white rounded-full px-4 items-center gap-2 flex-col h-16 w-16 ${flexCenter}`}
          >
            <img className="" src="/book.svg" alt="Add Journal" />
            <p className="text-black text-sm">Add</p>
          </div>
        </li>
        <li className="py-2">
          <div className="flex items-center gap-2 flex-col">
            <img className="px-2" src="/books-white.svg" alt="Entries" />
            <p className="text-white text-sm">Entries</p>
          </div>
        </li>
        <li className="py-2">
          <div className="flex items-center gap-2 flex-col">
            <img src="/review-white.svg" alt="Review" />
            <p className="text-white text-sm">Review</p>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default BottomNav;
