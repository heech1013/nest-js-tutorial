import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  BadRequestException,
  Header,
  Redirect,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

/** CRUD boiler plate
 * We can easily build boiler plate for CRUD by using `nest g resource ...` like `nest g resource Users`.
 */

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /** Body
   * Nest can handle body payload using @Body and DTO(Data Transfer Object).
   */
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    const { name, email } = createUserDto;

    return `User is created. name: ${name}, email: ${email}.`;
    // return this.usersService.create(createUserDto);
  }

  /** Query parameter
   * We can handle query by using @Query.
   * Several query parameter can be handled using (@Query) DTO. (See GetUserDto)
   * example: '/users?offset=0&limit=10'
   */
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  /** Redirect */
  @Redirect('https://nestjs.com', 301)
  @Get('/nestjs')
  redirectToNestJs() {
    return;
  }

  /** Header
   * Nest also automatically construct header.
   * But if you want to customize header, you can use @header().
   */
  @Header('Custom', 'Test Header')
  @Get(':id')
  findOne(@Param('id') id: string) {
    if (+id < 1) {
      throw new BadRequestException('id는 0보다 큰 값이어야 합니다.');
    }
    return this.usersService.findOne(+id);
  }

  // We can change HTTP code using @HttpCode.
  // Otherwise, there are default HTTP Code for each HTTP methods.
  @HttpCode(202)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  /** Route parameter
   * We can get parameter using @Param decorator.
   * Concept: DI(Dependency Injection)
   */
  @Delete(':userId/memo/:memoId')
  deleteUserMemo(
    @Param('userId') userId: string,
    @Param('memoId') memoId: string,
  ) {
    return `userId: ${userId}, memoId: ${memoId} is deleted.`;
  }
}
