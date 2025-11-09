import { Injectable } from '@nestjs/common';
import { OpportunityDto } from '@shared/dto/opportunity.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Opportunity } from './entities/opportunity.entity';

@Injectable()
export class OpportunitiesService {
  constructor(@InjectModel(Opportunity.name) private opportunityModel: Model<Opportunity>
  ) {}

  async create(createOpportunityDto: OpportunityDto) : Promise<Opportunity> {
    const opportunity = new this.opportunityModel(createOpportunityDto);
    return await opportunity.save();
  }

  async findAll() : Promise<Opportunity[]> {
    return await this.opportunityModel.find().exec();
  }

  async findOne(id: number) : Promise<Opportunity | null> {
    return this.opportunityModel.findById(id).exec();
  }

  async update(id: number, updateOpportunityDto: OpportunityDto) : Promise<Opportunity | null> {
    return this.opportunityModel.findByIdAndUpdate(id, updateOpportunityDto, { new: true }).exec();
  }

  async remove(id: number) : Promise<Opportunity | null> {
    return this.opportunityModel.findByIdAndDelete(id).exec();
  }
}
