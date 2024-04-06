const Counter = ({
  maxNumberOfSeats,
  numOfSeatsLeft,
  numOfTicketSelected,
  setNumOfTicketSelected
}) => {
  const handleIncrement = () => {
    if (numOfTicketSelected < maxNumberOfSeats && numOfSeatsLeft > 0) {
      setNumOfTicketSelected((prevNum) =>
        Math.min(prevNum + 1, maxNumberOfSeats)
      );
    }
  };

  const handleDecrement = () => {
    if (numOfTicketSelected > 1) {
      setNumOfTicketSelected((prevNum) => Math.max(prevNum - 1, 0));
    }
  };

  const handleChange = (e) => {
    const newValue = parseInt(e.target.value);
    if (isNaN(newValue)) setNumOfTicketSelected(0);
    setNumOfTicketSelected(Math.min(Math.max(newValue, 0), maxNumberOfSeats));
  };

  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm text-gray-400">Select Number of Seats</p>
      <div className="flex items-center gap-2">
        <button
          onClick={handleDecrement}
          disabled={numOfTicketSelected === 1}
          className="p-2 text-sm text-gray-500 border border-gray-500 rounded-md cursor-pointer hover:bg-gray-200 focus:outline-none disabled:opacity-50"
        >
          -
        </button>
        <input
          type="number"
          className="w-20 p-2 px-3 text-sm text-center text-gray-500 border border-gray-500 rounded-md appearance-none"
          value={numOfTicketSelected}
          onChange={handleChange}
          min={0}
          max={Math.min(maxNumberOfSeats, numOfSeatsLeft)}
        />
        <button
          onClick={handleIncrement}
          disabled={
            numOfTicketSelected === maxNumberOfSeats || numOfSeatsLeft === 0
          }
          className="p-2 text-sm text-gray-500 border border-gray-500 rounded-md cursor-pointer hover:bg-gray-200 focus:outline-none disabled:opacity-50"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default Counter;
