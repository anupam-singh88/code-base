import { Module } from "@nestjs/common";
import { AccountsController } from "./controllers/accounts.controller";
import { UsersController } from "./controllers/users.controller";
import { UsersService } from "./services/users.service";


// @globalThis() will make this module globally available
@Module({
  controllers: [UsersController, AccountsController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
