import { Component, OnInit } from '@angular/core';
import { Message } from 'src/app/constants/message';
import { ChatbotService } from 'src/app/services/chatbot.service';
import { ChatbotRequestDTO } from 'src/app/models/chatbot-request-dto';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss']
})
export class ChatbotComponent implements OnInit {

  showChatbotPopup = false;
  searchText = '';

  constructor(
    private chatbotService: ChatbotService
  ) { }

  chat: Message[] = [];

  ngOnInit() {
    this.chat = [
      {owner: 'bot', message: 'Hi'},
      {owner: 'bot', message: 'How can I help you?'}
    ];
  }

  toggleChatbot() {
    this.showChatbotPopup = !this.showChatbotPopup;
  }

  sendrequest() {
    if (this.searchText) {
      this.chat.push(
        {owner: 'user', message: this.searchText}
      );
      this.scrollToBottom();
      this.getChatBotResponse(this.searchText);
      this.searchText = '';
    }
  }

  getChatBotResponse(question: string) {
    const chatbotRequstDto = new ChatbotRequestDTO();
    chatbotRequstDto.sessionID = '12345';
    chatbotRequstDto.question = question;
    this.chatbotService.getChatBotResponse(chatbotRequstDto).subscribe(response => {
      this.chat.push(
        {owner: 'bot', message: response.data}
      );
      this.scrollToBottom();
    });
  }

  scrollToBottom() {
    setTimeout(() => {
      const div = document.getElementById('chatbot-body');
      div.scrollTop = div.scrollHeight - div.clientHeight;
    }, 500);
  }
}
