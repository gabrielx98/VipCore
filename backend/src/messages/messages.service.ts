import { Injectable } from '@nestjs/common';
import { MessageDto } from '@shared/dto/message.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message } from './entities/message.entity';
import { ResponseApi } from '@shared/types/responseApi';
import { HttpStatus } from '@nestjs/common';

@Injectable()
export class MessagesService {
  constructor(@InjectModel(Message.name) private messageModel: Model<Message>
  ) {}

  async create(createMessageDto: MessageDto) : Promise<ResponseApi<Message>> {
    const message = new this.messageModel(createMessageDto);
    try {
      await message.save();
      return {
            statusCode: HttpStatus.CREATED,
            message: 'Mensagem criada com sucesso',
            data: {},
          } as ResponseApi<Message>;
    } catch (error) {
      return {
            statusCode: HttpStatus.BAD_REQUEST,
            message: 'Erro ao criar mensagem: ' + error,
            data: {},
          } as ResponseApi<Message>;
    }
  }

  async findAll() : Promise<ResponseApi<Message[]>> {
    try {
     const data = await this.messageModel.find().exec();
     return {
      statusCode: HttpStatus.OK,
      message: 'Operação realizada com sucesso',
      data: data,
     } as ResponseApi<Message[]>;
    } catch (error) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Erro ao buscar lista de mensagens: ' + error,
        data: [],
      } as ResponseApi<Message[]>;
     }
  }

  async findOne(id: number) : Promise<ResponseApi<Message>> {
    try {
     const data =  await this.messageModel.findById(id).exec();
     return {
      statusCode: HttpStatus.OK,
      message: 'Operação realizada com sucesso',
      data: data,
     } as ResponseApi<Message>;
    } catch (error) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Erro ao buscar mensagem: ' + error,
        data: {},
      } as ResponseApi<Message>;
     }
  }

  async update(id: number, updateMessageDto: MessageDto) : Promise<ResponseApi<Message>> {
    try {
     const data = await this.messageModel.findByIdAndUpdate(id, updateMessageDto, { new: true }).exec();
     return {
      statusCode: HttpStatus.OK,
      message: 'Mensagem atualizada com sucesso',
      data: data,
     } as ResponseApi<Message>;
    } catch (error) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Erro ao atualizar mensagem: ' + error,
        data: {},
      } as ResponseApi<Message>;
     }
  }

  async remove(id: number) : Promise<ResponseApi<Message>> {
    try {
     await this.messageModel.findByIdAndDelete(id).exec();
     return {
      statusCode: HttpStatus.OK,
      message: 'Mensagem removida com sucesso',
      data: {},
     } as ResponseApi<Message>;
    } catch (error) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Erro ao remover mensagem: ' + error,
        data: {},
      } as ResponseApi<Message>;
     }
  }
}
