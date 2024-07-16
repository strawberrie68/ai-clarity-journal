export const formatDate = (date) => {
  const options = { weekday: "short", month: "short", day: "numeric" };
  const dateObj = new Date(date);
  return dateObj.toLocaleDateString("en-US", options);
};

export const formattedHaiku = (haiku) => {
  return haiku?.split(",").map((part, index) => (
    <p key={index}>
      {part.trim()}
      <br />
    </p>
  ));
};

export const formatQuote = (quote) => {
  if (!quote) return null;

  const [quoteText, author] = quote.split(" - ");
  return (
    <div className="">
      <p className="text-lg">{quoteText}</p>
      {author && (
        <>
          <p className="mt-2 text-xs flex justify-end pr-10"> - {author}</p>
        </>
      )}
    </div>
  );
};

export const getCurrentTimePeriod = () => {
  const currentHour = new Date().getHours();
  return currentHour >= 6 && currentHour < 18 ? "morning" : "night";
};

export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
