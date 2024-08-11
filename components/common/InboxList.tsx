import InboxItem from "./InboxItem";
import "../../styles/global.css";

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
        icon="☕️"
        text="Drink only 3 cups of coffee"
        status="In progress"
        background="bg-yellow-50"
      />
    </ul>
  );
};

export default InboxList;
