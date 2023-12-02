import axios from "axios";
import React, { useEffect, useState } from "react";

const TicketInfoPage = () => {
  const [ticketData, setTicketData] = useState({});

  useEffect(() => {
    const fetchTicketData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/tickets/getTicket",
          {
            params: {
              ticketId: 6,
            },
          }
        );
        setTicketData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching ticket data:", error);
      }
    };

    fetchTicketData();
  }, []);

  return (
    <div>
      <h2>Booked Movie Tickets</h2>
      <table>
        <thead>
          <tr>
            <th>Ticket ID</th>
            <th>Show Date</th>
            <th>Show Time</th>
            <th>Status</th>
            <th>Theater Name</th>
            <th>Price</th>
            <th>Seat Assignment</th>
            <th>Multiplex Name</th>
          </tr>
        </thead>
        <tbody>
          {/* {ticketData.map((ticket) => ( */}
          {ticketData && (
            <tr key={ticketData.ticketId}>
              <td>{ticketData.ticketId}</td>
              <td>{ticketData.showDate}</td>
              <td>{ticketData.showTime}</td>
              <td>{ticketData.status}</td>
              <td>{ticketData.theaterName}</td>
              <td>{ticketData.price}</td>
              <td>{ticketData.seatAssignment}</td>
              <td>{ticketData.multiplexName}</td>
            </tr>
          )}
          {/* ))} */}
        </tbody>
      </table>
    </div>
  );
};

export default TicketInfoPage;
