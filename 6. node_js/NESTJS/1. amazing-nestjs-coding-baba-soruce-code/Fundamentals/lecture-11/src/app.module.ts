import { Module } from "@nestjs/common";
import { UsersStore } from "./stores/users.store";
import { UsersController } from "./users.controller";

@Module({
  controllers: [UsersController],
  providers: [
    // NOTE: we are not providing the `UsersStore` dependency
    // UsersStore,

    // NOTE: we are providing the `UsersStore` dependency
    // {
    //   provide: "UsersStore", //inhjection token 
    //   useClass: UsersStore //injection class
    //   useExisting: UsersStore //injection class
    // }
  ],
})
export class AppModule { }
