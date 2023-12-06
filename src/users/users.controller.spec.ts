import mongoose from 'mongoose';
import { UsersController } from './users.controller';
import { usersServices } from './users.service';
import { Test, TestingModule } from '@nestjs/testing';
import { User, UserSchema } from './user.schema';
import { CreateUserDto } from './dto/createuserdto';
import { UpdateCreateUserDto } from './dto/updateUserdto';


describe('UsersController', () => {
  let UserService: usersServices;
  let usersController: UsersController;

  //moc Data----------------------------------------------------------

  const mocuser = {
    id: new mongoose.Types.ObjectId('6569b9f34c7253a8832ebbbd'),
    name: 'aakash',
    fname: 'abcd',
    age: '22',
    address: 'Jind',
    department: 'IT',
  };

  //Creating Moc--------------------------------------------------------

  const mockUserService = {
    findAllUsers: jest.fn().mockResolvedValueOnce([mocuser]),
    createUser: jest.fn(),
    updateById: jest.fn(),
    getUserById: jest.fn().mockResolvedValueOnce(mocuser),
    deleteUserById :jest.fn().mockResolvedValueOnce({deleted:true}),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: usersServices,
          useValue: mockUserService,
        },
      ],
    }).compile();
    (UserService = module.get<usersServices>(usersServices)),
      (usersController = module.get<UsersController>(UsersController));
  });
  
  //get all Users-------------------------------------------------------
  describe('findAllUsers', () => {
    it('should return all Users', async () => {
      const result = await usersController.findAllUsers();
      expect(UserService.findAllUsers).toHaveBeenCalled();
      expect(result).toEqual([mocuser]);
    });
  });


  //create user---------------------------------------------------------
  describe("create",() =>{
    it("should create a new user" ,async () =>{
      const createUserDto={
        id:new mongoose.Types.ObjectId(),
        name:"test",
        fname :"abcd",
        age :"30",
        address :"jj",
        department:"IT",
      };
      jest.spyOn(UserService,"createUser").mockResolvedValueOnce(mocuser);
      const result = await usersController.creatuser(createUserDto);
      expect(UserService.createUser).toHaveBeenCalledWith(createUserDto)
      expect(result).toEqual(mocuser);
    });
  });



  //update user-------------------------------------------------------------

  describe('updateUserById', () => {
    it('should update the user by ID', async () => {
      const updateUserDto: UpdateCreateUserDto = {
        id: new mongoose.Types.ObjectId(),
        name: 'danish',
        fname: '123',
        age: '200',
        address: 'India',
        department: 'IT',
        
      };

      const updatedUser = { ...mocuser, name: 'update name' };
      const userId = new mongoose.Types.ObjectId(mocuser.id);

      jest.spyOn(UserService, 'updateById').mockResolvedValue(updatedUser);

      const result = await usersController.updateUserById(
        userId,
        updateUserDto,
      );

      expect(UserService.updateById).toHaveBeenCalledWith(
        userId,
        updateUserDto,
      );
      expect(result).toEqual(updatedUser);
    });
  });


  //find by id-------------------------------------------------------


  describe('getuserbyid', () => {
    it('should return user by id', async () => {
      jest.spyOn(UserService, 'getUserById').mockResolvedValue(mocuser);

      const result = await usersController.getUserById(mocuser.id);

      expect(UserService.getUserById).toHaveBeenCalledWith(mocuser.id);
      expect(result).toEqual(mocuser);
    });
  });


  //deletebyid---------------------------------------------------------
  describe('deleteUserById', () => {
          it('should delete the user by id', async () => {
          const result = await usersController.deleteUserById(mocuser.id);

        expect(UserService.deleteUserById).toHaveBeenCalledWith(mocuser.id);
        expect(result).toEqual({deleted:true});
      });
  });
});
