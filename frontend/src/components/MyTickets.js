import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import axios from 'axios';

const MyTickets = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    // Fetch ticket data from the API when the component mounts
    const fetchTickets = async () => {
      try {
        const response = await axios.get('API_ENDPOINT');
        setTickets(response.data);
      } catch (error) {
        console.error('Error fetching ticket data:', error);
      }
    };

    fetchTickets();
  }, []); // Empty dependency array means this effect runs once when the component mounts

  const handleCancelTicket = async (ticketId) => {
    try {
      // Simulate an API call to cancel the ticket with the given ID
      await axios.delete(`YOUR_API_ENDPOINT_HERE/${ticketId}`);

      // Update the state by filtering out the canceled ticket
      const updatedTickets = tickets.filter((ticket) => ticket.id !== ticketId);
      setTickets(updatedTickets);

      console.log(`Canceling ticket with ID ${ticketId}...`);
      console.log('Updated Tickets:', updatedTickets);
    } catch (error) {
      console.error('Error canceling ticket:', error);
    }
  };

  return (
    <div>
      <h2>My Tickets</h2>
      {tickets.map((ticket) => (
        <div key={ticket.id} className="ticket-item">
          <p>{`Movie: ${ticket.movie}, Seat: ${ticket.seat}`}</p>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => handleCancelTicket(ticket.id)}
          >
            Cancel Ticket
          </Button>
        </div>
      ))}
    </div>
  );
};

export default MyTickets;
