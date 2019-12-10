import User from "./entity";
import {
  JsonController,
  Get,
  Param,
  Body,
  Put,
  Post,
  HttpCode,
  NotFoundError
} from "routing-controllers";

type UserList = { users: User[] };

@JsonController()
export default class UserController {
  @Get("/users/:id")
  getPage(@Param("id") id: number) {
    return User.findOne(id);
  }
  @Get("/users")
  async allUsers(): Promise<UserList> {
    const result = await User.find();
    return { users: result };
  }
  @Put("/users/:id")
  async updateUser(@Param("id") id: number, @Body() update: Partial<User>) {
    const user = await User.findOne(id);
    if (!user) throw new NotFoundError("Cannot find user");

    return User.merge(user, update).save();
  }
  @Post("/users")
  @HttpCode(201)
  async createUser(@Body() user: User) {
    const { password, ...rest } = user;
    const entity = User.create(rest);
    await entity.setPassword(password);
    return entity.save();
  }
}
