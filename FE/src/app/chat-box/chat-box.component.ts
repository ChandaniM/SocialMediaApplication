import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.scss'],
})
export class ChatBoxComponent implements OnInit {
  message: string = ''; // Stores the current input message
  messages: Array<{ text: string; timestamp: string; sender: string }> = []; // Array of messages

  constructor(private route: Router) {}

  ngOnInit(): void {
    // You can initialize with any predefined messages here if needed
  }

  close() {
    this.route.navigate(['chat']);
  }

  sendMessage() {
    if (this.message.trim()) {
      const newMessage = {
        text: this.message,
        timestamp: this.getCurrentTime(),
        sender: 'user', // Assume the user is always the sender in this case
      };

      // Add the new message to the messages array
      this.messages.push(newMessage);

      // Simulate receiving a message after a slight delay
      setTimeout(() => {
        this.receiveMessage("Hello, I received your message!");
      }, 2000);

      // Clear the input after sending
      this.message = '';
    }
  }

  receiveMessage(text: string) {
    const receivedMessage = {
      text: text,
      timestamp: this.getCurrentTime(),
      sender: 'receiver', // Simulating a message from the receiver
    };

    this.messages.push(receivedMessage);
  }

  // Utility function to get the current time in HH:MM AM/PM format
  getCurrentTime(): string {
    const now = new Date();
    const hours = now.getHours() % 12 || 12;
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const ampm = now.getHours() >= 12 ? 'PM' : 'AM';
    return `${hours}:${minutes} ${ampm}`;
  }
}
