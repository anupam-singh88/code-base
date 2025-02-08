import { Module, Scope } from "@nestjs/common";
import { AuthController, JwtStrategy } from "./auth.controller";
import { StudentsController } from "./students.controller";
import { UsersController } from "./users.controller";
import { UsersStore } from "./users.store";

@Module({
  controllers: [UsersController, StudentsController, AuthController],
  providers: [
    { provide: "STORE", useClass: UsersStore, scope: Scope.TRANSIENT },

    {
      provide: JwtStrategy,
      useClass: JwtStrategy,
      scope: Scope.REQUEST,
    },
  ],
})
export class AppModule { }

//@Injectable({Scope: Scope.TRANSIENT}) // NEW DEDICATED INSTANCE FOR EACH MODULE WHOEVER INJECTS IT used for caching mostly

//@Injectable({Scope: Scope.request}) //every time new instance created wehn request comes

// @Injectable({Scope: Scope.DEFAULT}) //single shared provider instance for all modules
