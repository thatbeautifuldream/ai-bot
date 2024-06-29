import axios from "axios";

// Function to send booking details to the webhook
async function sendBookingToWebhook(bookingDetails: any) {
  try {
    const webhookUrl =
      "https://webhook.site/b7d83466-bc2a-4a82-a7ac-d80c2049cd59";
    const response = await axios.post(webhookUrl, bookingDetails);
    console.log("Webhook sent successfully:", response.data);
  } catch (error) {
    console.error("Error sending webhook:", error);
  }
}

// Example booking details
const bookingDetails = {
  name: "John Doe",
  hotelName: "Hotel California",
  checkIn: "2023-05-01",
  checkOut: "2023-05-05",
  roomType: "Deluxe",
};

// Simulate a hotel booking completion
export async function completeBooking() {
  // Here you would have your logic for completing the booking
  console.log("Booking completed successfully.");

  // Send booking details to the webhook
  await sendBookingToWebhook(bookingDetails);
}

// Simulate completing a booking
completeBooking();
