import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Seats = () => {
  const navigate = useNavigate();
  const { id, seats } = useParams();
  const [seatDetails, setSeatDetails] = useState(generateInitialSeatDetails());
  const [selectedSeatsCount, setSelectedSeatsCount] = useState(0);

  useEffect(() => {
    if (!seats) {
      clearSelectedSeats();
    }
  }, [seats]);

  function generateInitialSeatDetails() {
    const screenConfig = { rows: 8, cols: 10 };
    const initialSeatDetails = {};
    for (let i = 1; i <= screenConfig.rows; i++) {
      const rowKey = `Row ${String.fromCharCode(65 + i - 1)}`;
      initialSeatDetails[rowKey] = Array(screenConfig.cols).fill(0);
    }
    return initialSeatDetails;
  }

  const clearSelectedSeats = () => {
    setSeatDetails((prevSeatDetails) => {
      const newSeatDetails = { ...prevSeatDetails };
      for (let key in newSeatDetails) {
        newSeatDetails[key] = newSeatDetails[key].map((seatValue) =>
          seatValue === 2 ? 0 : seatValue
        );
      }
      return newSeatDetails;
    });
    setSelectedSeatsCount(0);
  };

  const onSeatClick = (rowIndex, colIndex) => {
    if (
      selectedSeatsCount > 1 ||
      seatDetails[`Row ${String.fromCharCode(65 + rowIndex)}`][colIndex] === 1
    ) {
      // Ignore click if already booked or reached the maximum limit
      return;
    }

    if (
      seatDetails[`Row ${String.fromCharCode(65 + rowIndex)}`][colIndex] === 2
    ) {
      setSeatDetails((prevSeatDetails) => {
        const newSeatDetails = { ...prevSeatDetails };
        newSeatDetails[`Row ${String.fromCharCode(65 + rowIndex)}`][
          colIndex
        ] = 0;
        return newSeatDetails;
      });
      setSelectedSeatsCount((prevCount) => prevCount - 1);
    } else {
      setSeatDetails((prevSeatDetails) => {
        const newSeatDetails = { ...prevSeatDetails };
        newSeatDetails[`Row ${String.fromCharCode(65 + rowIndex)}`][
          colIndex
        ] = 2;
        return newSeatDetails;
      });
      setSelectedSeatsCount((prevCount) => prevCount + 1);
    }
  };

  const getClassNameForSeats = (seatValue) => {
    let styleseats, dynamicClass;
    styleseats =
      "select-none cursor-pointer text-gray-700 text-sm font-bold px-3 py-2 rounded-md shadow-md";

    if (seatValue === 0) {
      dynamicClass = "bg-gray-200 cursor-default text-gray-800 shadow-none";
    } else if (seatValue === 1) {
      dynamicClass = "bg-gray-500 bg-opacity-40 cursor-default";
    } else if (seatValue === 2) {
      dynamicClass = "text-white !important bg-green-500";
    } else {
      dynamicClass = "cursor-default text-white !important shadow-none";
    }

    return `${styleseats} ${dynamicClass}`;
  };

  const RenderSeats = () => {
    let seatArray = [];
    for (let key in seatDetails) {
      const rowIndex = key.charCodeAt(4) - 65;
      let colValue = seatDetails[key].map((seatValue, colIndex) => (
        <span key={`${key}.${colIndex}`} className="m-10">
          {colIndex === 0 && (
            <span className="text-gray-700 font-bold mr-2">{key}</span>
          )}
          <span
            className={getClassNameForSeats(seatValue)}
            onClick={() => onSeatClick(rowIndex, colIndex)}
          >
            {colIndex + 1}
          </span>
          {colIndex === seatDetails[key].length - 1 && (
            <>
              <br />
              <br />
            </>
          )}
        </span>
      ));
      seatArray.push(colValue);
    }
    return <div className="ml-n30">{seatArray}</div>;
  };

  const handlePay = () => {
    navigate("/paymentPage", { state: { purchaseTicket: true } });
  };

  const RenderPaymentButton = () => {
    const selectedSeats = [];
    for (let key in seatDetails) {
      seatDetails[key].forEach((seatValue, colIndex) => {
        if (seatValue === 2) {
          selectedSeats.push(`${key}${colIndex + 1}`);
        }
      });
    }
    if (selectedSeats.length) {
      return (
        <div className="sticky bottom-10">
          <Button
            variant="contained"
            className="bg-pink-500 !important"
            onClick={handlePay}
          >
            Pay
          </Button>
        </div>
      );
    } else {
      return <></>;
    }
  };

  return (
    <>
      <div className="text-center">
        <h1>Movie Title</h1>
        {RenderSeats()}
        {RenderPaymentButton()}
      </div>
    </>
  );
};

export default Seats;
