import axios from "axios";
import readline from "readline";
import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const openai = new OpenAI();

// Function to ask question and get response
const askQuestion = (query: string) => {
  return new Promise((resolve) => {
    rl.question(query, (input) => {
      resolve(input);
    });
  });
};

// Function to send booking details to the webhook
async function sendBookingToWebhook(bookingDetails: any) {
  const webhookUrl =
    "https://webhook.site/b7d83466-bc2a-4a82-a7ac-d80c2049cd59";
  try {
    await axios.post(webhookUrl, bookingDetails);
    console.log("Booking details sent to webhook successfully.");
  } catch (error) {
    console.error("Failed to send booking details to webhook:", error);
  }
}

// Main chat function
async function chat() {
  let continueChat = true;

  while (continueChat) {
    const userMessage = await askQuestion("You: ");

    if (userMessage === "exit") {
      continueChat = false;
      console.log("Exiting chat...");
      rl.close();
    } else {
      const completion = await openai.chat.completions.create({
        messages: [
          {
            role: "system",
            content: `You are a hotel booking assistant. You have the capabilities to book a hotel for a user. Give random details for now.
              Once the booking is confirmed, please mention "Booking confirmed" in the response.
              `,
          },
          { role: "user", content: userMessage },
        ],
        model: "gpt-3.5-turbo",
      });

      console.log(`AI: ${completion.choices[0].message.content}`);

      // Example condition to trigger webhook call
      if (
        completion?.choices[0]?.message?.content?.includes("Booking confirmed")
      ) {
        // Example booking details
        const bookingDetails = {
          userMessage,
          bookingConfirmation: completion.choices[0].message.content,
        };
        await sendBookingToWebhook(bookingDetails);
      }
    }
  }
}

// Start the chat
chat();
