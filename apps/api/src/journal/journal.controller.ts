import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { JournalService } from './journal.service';
import { CreateJournalDto } from './dto/create-journal.dto';
import { UpdateJournalDto } from './dto/update-journal.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('journal')
export class JournalController {
  constructor(private readonly journalService: JournalService) {}

  @Post()
  create(@Request() req, @Body() createJournalDto: CreateJournalDto) {
    return this.journalService.create(req.user.userId, createJournalDto);
  }

  @Get()
  findAll(@Request() req) {
    return this.journalService.findAllByUser(req.user.userId);
  }

  @Get(':id')
  findOne(@Request() req, @Param('id') id: string) {
    return this.journalService.findOne(id, req.user.userId);
  }

  @Patch(':id')
  update(@Request() req, @Param('id') id: string, @Body() updateJournalDto: UpdateJournalDto) {
    return this.journalService.update(id, req.user.userId, updateJournalDto);
  }

  @Delete(':id')
  remove(@Request() req, @Param('id') id: string) {
    return this.journalService.remove(id, req.user.userId);
  }
}
