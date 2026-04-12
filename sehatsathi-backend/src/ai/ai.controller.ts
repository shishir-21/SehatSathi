import { Controller, Post, Body, UseInterceptors, UploadedFile, BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AiService } from './ai.service';

@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('chat')
  async chat(@Body() body: { message: string; language?: string }) {
    if (!body.message) {
      return { error: 'Message is required' };
    }
    return this.aiService.analyzeSymptom(body.message, body.language);
  }

  // File Upload API
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: any) {
    if (!file) throw new BadRequestException('Multipart file field "file" is required');
    return this.aiService.analyzeFile(file);
  }
}
