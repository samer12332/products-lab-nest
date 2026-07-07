import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';

type CreateUserInput = {
  name: string;
  email: string;
  password: string;
};

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async create(createUserInput: CreateUserInput) {
    const existingUser = await this.userModel
      .findOne({
        email: createUserInput.email,
      })
      .exec();

    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    return this.userModel.create(createUserInput);
  }

  findByEmail(email: string) {
    return this.userModel.findOne({ email }).exec();
  }

  findById(id: string) {
    return this.userModel.findById(id).exec();
  }
}
