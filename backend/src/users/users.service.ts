import { Injectable } from '@nestjs/common';
import { UserDto, UserRole, UserStatus } from '@shared/dto/user.dto';
import * as bcrypt from 'bcrypt';
import { User, UserSchema } from './entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { ResponseApi } from '@shared/types/responseApi';
import { HttpStatus } from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>, 
  private readonly jwtService: JwtService
) {}

  async create(createUserDto: UserDto): Promise<ResponseApi<User>> {
    const hashedPassword = bcrypt.hashSync(createUserDto.password, 10);
    const user = new this.userModel({
      ...createUserDto,
      password: hashedPassword,
    });
    try {
      await user.save();
      return {
            statusCode: HttpStatus.CREATED,
            message: 'Usuário criado com sucesso',
            data: {},
          } as ResponseApi<User>;
    } catch (error) {
      return {
            statusCode: HttpStatus.BAD_REQUEST,
            message: 'Erro ao criar usuário: ' + error,
            data: {},
          } as ResponseApi<User>;
    }
  }

  async validadeUser(userDto: UserDto): Promise<ResponseApi<User>> {
    const user = await this.userModel.findOne({ email: userDto.email });
    const hashedPassword = bcrypt.hashSync(userDto.password, 10);
    if (user && bcrypt.compareSync(hashedPassword, user.passwordHash)) {
      const { password, ...result } = userDto;
      return {
        statusCode: HttpStatus.OK,
        message: 'Usuário validado com sucesso',
        data: result as User,
      } as ResponseApi<User>;
    } else {
      return {
        statusCode: HttpStatus.UNAUTHORIZED,
        message: 'Credenciais inválidas',
        data: {},
      } as ResponseApi<User>;
    }}

  async findAll(): Promise<ResponseApi<User[]>> {
    try {
     const data = await this.userModel.find({ role: UserRole.MEMBRO, status: UserStatus.APROVADO }).exec();
     const sanitized = data.map(user => {
      const obj = (user as any).toObject ? (user as any).toObject() : { ...(user as any) };
      delete obj.passwordHash;
      delete obj.appraiser;
      delete obj.status
      return obj;
     });
     return {
      statusCode: HttpStatus.OK,
      message: 'Operação realizada com sucesso',
      data: sanitized as User[],
     } as ResponseApi<User[]>;
    } catch (error) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Erro ao buscar lista de usuários: ' + error,
        data: [],
      } as ResponseApi<User[]>;
     }
  }

  async findOne(id: number): Promise<ResponseApi<User>> {
    try {
     const data =  await this.userModel.findById( id ).exec();
     if (data) {
      const obj = (data as any).toObject ? (data as any).toObject() : { ...(data as any) };
      delete obj.passwordHash;
      delete obj.appraiser;
      delete obj.status
     }
      return {
      statusCode: HttpStatus.OK,
      message: 'Operação realizada com sucesso',
      data: data as User,
     } as ResponseApi<User>;
    } catch (error) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Erro ao buscar usuário: ' + error,
        data: {},
      } as ResponseApi<User>;
     }
  }

  async update(id: number, updateUserDto: UserDto) : Promise<ResponseApi<User>> {
    try {
     const data = await this.userModel.findOneAndUpdate({ id }, updateUserDto, { new: true }).exec();
     return {
      statusCode: HttpStatus.OK,
      message: 'Operação realizada com sucesso',
      data: data as User,
     } as ResponseApi<User>;
    } catch (error) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Erro ao atualizar usuário: ' + error,
        data: {},
      } as ResponseApi<User>;
     }
  }

  async remove(id: number) : Promise<ResponseApi<User>> {
    try {
     await this.userModel.findOneAndUpdate({ id }, { active: false }).exec();
     return {
      statusCode: HttpStatus.OK,
      message: 'Operação realizada com sucesso',
      data: {},
     } as ResponseApi<User>;
    } catch (error) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Erro ao deletar usuário: ' + error,
        data: {},
      } as ResponseApi<User>;
     }
  }
}
