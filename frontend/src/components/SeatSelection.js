import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./Seats.module.scss";

const Seats = () => {
  const router = useRouter();
  const { id, seats } = router.query;
  const screenConfig =
    id === "1" ? { rows: 8, cols: 8 } : { rows: 10, cols: 10 };
  const [seatDetails, setSeatDetails] = useState(
    generateInitialSeatDetails(screenConfig)
  );
  const [selectedSeatsCount, setSelectedSeatsCount] = useState(0);

  useEffect(() => {
    if (!seats) {
      clearSelectedSeats();
    }
  }, []);

  const generateInitialSeatDetails = ({ rows, cols }) => {
    const initialSeatDetails = {};
    for (let i = 1; i <= rows; i++) {
      const rowKey = `Row ${String.fromCharCode(65 + i - 1)}`;
      initialSeatDetails[rowKey] = Array(cols).fill(0);
    }
    return initialSeatDetails;
  };

  const clearSelectedSeats = () => {
    const newSeatDetails = { ...seatDetails };
    for (let key in seatDetails) {
      newSeatDetails[key] = newSeatDetails[key].map((seatValue) =>
        seatValue === 2 ? 0 : seatValue
      );
    }
    setSeatDetails(newSeatDetails);
    setSelectedSeatsCount(0);
  };

  const onSeatClick = (rowIndex, colIndex) => {
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
    } else if (selectedSeatsCount < 8) {
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
    let dynamicClass;
    if (seatValue === 0) {
      dynamicClass = styles.seatNotBooked;
    } else if (seatValue === 1) {
      dynamicClass = styles.seatBooked;
    } else if (seatValue === 2) {
      dynamicClass = styles.seatSelected;
    } else {
      dynamicClass = styles.seatBlocked;
    }
    return `${styles.seats} ${dynamicClass}`;
  };

  const RenderSeats = () => {
    let seatArray = [];
    for (let key in seatDetails) {
      const rowIndex = key.charCodeAt(4) - 65;
      let colValue = seatDetails[key].map((seatValue, colIndex) => (
        <span key={`${key}.${colIndex}`} className={styles.seatsHolder}>
          {colIndex === 0 && <span className={styles.colName}>{key}</span>}
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
    return <div className={styles.seatsLeafContainer}>{seatArray}</div>;
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
        <Link
          href={{
            pathname: "/payment",
            query: { movieId: id, seatDetails: JSON.stringify(seatDetails) },
          }}
        >
          <div className={styles.paymentButtonContainer}>
            <Button
              variant="contained"
              href="#contained-buttons"
              className={styles.paymentButton}
            >
              Pay Rs.{selectedSeats.length * 100}{" "}
              {/* Assuming ticket cost is 100, you can adjust accordingly */}
            </Button>
          </div>
        </Link>
      );
    } else {
      return <></>;
    }
  };

  return (
    <>
      <Head>
        <title>Seats</title>
      </Head>
      <div className={styles.seatsContainer}>
        <h1>Movie Title</h1>
        {seatDetails && <RenderSeats />}
        <RenderPaymentButton />
      </div>
    </>
  );
};

export default Seats;
