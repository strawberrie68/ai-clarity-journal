const InboxItem = ({ text, icon, status, background }) => {
  const flexCenter = "flex justify-center items-center";
  return (
    <li className="nav-item py-2">
      <div className="flex justify-between items-center">
        <div className="flex gap-4 items-center flex-grow">
          <div
            className={`${flexCenter} gap-2 h-9 w-9 rounded-lg ${background} basis-9`}
          >
            <p>{icon}</p>
          </div>
          <p className="line-clamp-1">{text}</p>
        </div>
        <div
          className={`${flexCenter} border border-black px-2 py-1 rounded-full h-9 basis-28`}
        >
          {status}
        </div>
      </div>
    </li>
  );
};
const InboxList = () => {
  return (
    <ul className="mt-4">
      <InboxItem
        icon="🏃‍♀️"
        text="Run 5k"
        status="In progress"
        background="bg-amber-100"
      />
      <InboxItem
        icon="🥦"
        text="Eat veggies for 1 week"
        status="In progress"
        background="bg-green-100"
      />
      <InboxItem
        icon="🥦"
        text="Eat veggies for 1 week"
        status="In progress"
        background="bg-green-100"
      />
      <InboxItem
        icon="🥦"
        text="Eat veggies for 1 week"
        status="In progress"
        background="bg-green-100"
      />
    </ul>
  );
};

export default InboxList;
