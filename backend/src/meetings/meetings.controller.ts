import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MeetingsService } from './meetings.service';
import { MeetingDto } from '@shared/dto/meeting.dto';

@Controller('meetings')
export class MeetingsController {
  constructor(private readonly meetingsService: MeetingsService) {}

  @Post()
  async create(@Body() createMeetingDto: MeetingDto) {
    return await this.meetingsService.create(createMeetingDto);
  }

  @Get()
  async findAll() {
    return await this.meetingsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.meetingsService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateMeetingDto: MeetingDto) {
    return await this.meetingsService.update(+id, updateMeetingDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.meetingsService.remove(+id);
  }
}
