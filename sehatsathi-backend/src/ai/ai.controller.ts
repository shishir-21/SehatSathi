import { Controller, Post, Body } from '@nestjs/common';
import { AiService } from './ai.service';

@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('chat')
  async chat(@Body() body: { message: string; language?: string }) {
    if (!body.message) {
      return { error: 'Message is required' };
    }
    const response = await this.aiService.analyzeSymptom(body.message, body.language);
    return response;
  }
}
