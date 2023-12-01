

export const calculateTotalPrice = (numberOfTickets, serviceFee) => {
    const ticketPrice = 12;
    const subtotal = numberOfTickets * ticketPrice;
    const totalPrice = subtotal + serviceFee;
    return totalPrice;
};


