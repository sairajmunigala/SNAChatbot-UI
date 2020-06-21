import { Injectable } from '@angular/core';
import { HttpUtilsService } from './http-utils.service';
import { ChatbotRequestDTO } from '../models/chatbot-request-dto';
import { ChatbotEndpoints } from '../constants/chatbot-endpoints';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {

  constructor(
    private httpUtilsService: HttpUtilsService
  ) { }

  getChatBotResponse(request: ChatbotRequestDTO) {
    return this.httpUtilsService.post(ChatbotEndpoints.GET_CHATBOT_RESPONSE, request);
  }
}
