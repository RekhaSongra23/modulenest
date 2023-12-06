import { Test, TestingModule } from '@nestjs/testing';
import { usersServices } from './users.service';
import { getModelToken } from '@nestjs/mongoose';
import mongoose, { Model, model } from 'mongoose';
import { User, UserSchema } from './user.schema';
import { CreateUserDto } from './dto/createuserdto';
import { UpdateCreateUserDto } from './dto/updateUserdto';

describe('usersServices', () => {
  let userService: usersServices;
  let model: Model<User>;

  const mocuser = {
    id: new mongoose.Types.ObjectId('6569b9f34c7253a8832ebbbd'),
    name: 'aakash',
    fname: 'abcd',
    age: '22',
    address: 'Jind',
    department: 'IT',
  };

  const UserModel = mongoose.model<User & Document>('User', UserSchema);

  const mockUserService = {
    findById: jest.fn(),
    create: jest.fn(),
    findByIdAndUpdate: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        usersServices,
        {
          provide: getModelToken(User.name),
          useValue: mockUserService,
        },
      ],
    }).compile();
    userService = module.get<usersServices>(usersServices);
    model = module.get<Model<User>>(getModelToken(User.name));
  });

 //  for create user----------------------------------------------------------------
  describe('create', () => {
    it('should create and return userdata', async () => {
      const createUserDto: CreateUserDto = {
        id: new mongoose.Types.ObjectId(),

        name: 'ankit',

        fname: 'jangra',

        age: '300',

        address: 'Developer',

        department: 'sales',
      };

      const mockUser12 = new UserModel({
        id: new mongoose.Types.ObjectId('6555f34f38c7cda52bfa19e9'),
        name: 'aakash',

        fname: 'abcd',

        age: '22',

        address: 'jind',

        department: 'it',
      });
      jest.spyOn(model, 'create').mockResolvedValueOnce([mockUser12]);

      const result = await userService.createUser(createUserDto);
      expect(result).toEqual([mockUser12]);
    });
  });



  //UPDATE BY ID--------------------------------------------------------
  describe('updateUser', () => {
    it('should update and return userdata', async () => {
      const updateUserDto: UpdateCreateUserDto = {
        id: new mongoose.Types.ObjectId('6555f34f38c7cda52bfa19e9'),
        name: 'aakash',

        fname: 'abcd',

        age: '22',

        address: 'jind',

        department: 'it',
      };

      const updatedMockUser = new UserModel({
        ...mocuser,
        fname: 'Updated Name',
      });
      const userId = mocuser.id;

      jest.spyOn(model, 'findByIdAndUpdate').mockResolvedValue(updatedMockUser);

      const result = await userService.updateById(userId, updateUserDto);

      expect(model.findByIdAndUpdate).toHaveBeenCalledWith(
        userId,
        updateUserDto,
        { new: true },
      );
      expect(result).toEqual(updatedMockUser);
    });
  });

  //test for find byid-------------------------------------------------------------------------------
  describe('findById', () => {
    it('should find ', async () => {
      jest.spyOn(model, 'findById').mockResolvedValue(mocuser); //mocuser is fake implementation of func.

      const result = await userService.getUserById(mocuser.id);

      expect(result).toEqual(mocuser); //this is assertion
    });
  });
});
