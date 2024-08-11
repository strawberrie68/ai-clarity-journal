import { formatDate } from "../../utils/formatUtils";
import "../../styles/global.css";

const DateTitle = () => {
  const currentDate = new Date();
  const formattedDate = formatDate(currentDate);
  return (
    <div className="flexCenter bg-black rounded-xl h-9 mt-8 text-white px-4 w-40">
      {formattedDate}
    </div>
  );
};

export default DateTitle;
