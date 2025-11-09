import { Injectable } from '@nestjs/common';
import { UserDto } from '@shared/dto/user.dto';
import * as bcrypt from 'bcrypt';
import { User, UserSchema } from './entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>, 
  private readonly jwtService: JwtService
) {}

  async create(createUserDto: UserDto): Promise<User> {
    const hashedPassword = bcrypt.hashSync(createUserDto.password, 10);
    const user = new this.userModel({
      ...createUserDto,
      password: hashedPassword,
    });
    return await user.save();
  }

  async validadeUser(userDto: UserDto): Promise<any> {
    const user = await this.userModel.findOne({ email: userDto.email });
    const hashedPassword = bcrypt.hashSync(userDto.password, 10);
    if (user && bcrypt.compareSync(hashedPassword, user.passwordHash)) {
      const { password, ...result } = userDto;
      return result;
    }}

  async findAll(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  async findOne(id: number): Promise<User | null> {
    return await this.userModel.findOne({ id }).exec();
  }

  async update(id: number, updateUserDto: UserDto) : Promise<User | null> {
    const user = await this.userModel.findOneAndUpdate({ id }, updateUserDto, { new: true }).exec();
    return user;
  }

  async remove(id: number) : Promise<User | null> {
    let user = await this.userModel.findOne({ id }).exec();
    if (user) {
      user.active = false;
      await this.userModel.updateOne({ id, user }).exec();
      user = await this.userModel.findOne({ id }).exec();
    }
    return user;
  }
}
