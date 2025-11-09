import { Module } from '@nestjs/common';
import { OpportunitiesService } from './opportunities.service';
import { OpportunitiesController } from './opportunities.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Opportunity, OpportunitySchema } from './entities/opportunity.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: Opportunity.name, schema: OpportunitySchema }])],
  controllers: [OpportunitiesController],
  providers: [OpportunitiesService],
  exports: [OpportunitiesService]
})
export class OpportunitiesModule {}
