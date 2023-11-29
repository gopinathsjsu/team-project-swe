export const calculateTotalPrice = (numberOfTickets, serviceFee) => {
    const ticketPrice = 8;
    const subtotal = numberOfTickets * ticketPrice;
    const totalPrice = subtotal + serviceFee;
    return totalPrice;
};
