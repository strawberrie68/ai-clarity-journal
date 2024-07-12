import "../../styles/global.css";

const formatDate = (date) => {
  const options = { weekday: "short", month: "short", day: "numeric" };
  return date.toLocaleDateString("en-US", options);
};
const DateTitle = () => {
  const flexCenter = "flex justify-center items-center";
  const currentDate = new Date();
  const formattedDate = formatDate(currentDate);
  return (
    <div
      className={`${flexCenter} bg-black rounded-xl h-9 mt-12 text-white px-4 w-40`}
    >
      {formattedDate}
    </div>
  );
};

export default DateTitle;
