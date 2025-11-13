import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OpportunitiesService } from './opportunities.service';
import { OpportunityDto } from '@shared/dto/opportunity.dto';

@Controller('opportunities')
export class OpportunitiesController {
  constructor(private readonly opportunitiesService: OpportunitiesService) {}

  @Post()
  create(@Body() createOpportunityDto: OpportunityDto) {
    return this.opportunitiesService.create(createOpportunityDto);
  }

  @Get()
  findAll() {
    return this.opportunitiesService.findAll();
  }

  @Get(':userId')
  findAllByUser(@Param('userId') userId: string) {
    return this.opportunitiesService.findAllByUser(userId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOpportunityDto: OpportunityDto) {
    return this.opportunitiesService.update(+id, updateOpportunityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.opportunitiesService.remove(+id);
  }
}
