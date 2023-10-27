<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve user input
    $showtime = $_POST["showtime"];
    $creditCardNumber = $_POST["credit-card"];
    
    // Generate a confirmation message
    $confirmationMessage = "Thank you for your payment. Your ticket for $showtime is confirmed.";

    // Display the confirmation message to the user
    echo $confirmationMessage;
}
?>
