import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class ChatbotComponent {
  isChatOpen = false; // Controla si el chatbot está abierto o cerrado

  toggleChat() {
    this.isChatOpen = !this.isChatOpen;
  }
}
