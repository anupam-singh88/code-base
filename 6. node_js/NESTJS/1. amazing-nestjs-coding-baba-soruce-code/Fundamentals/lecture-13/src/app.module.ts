import { Module } from "@nestjs/common";
import { UsersController } from "./users.controller";

// MOCK: database connection
function createConnection(options = {}) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        message: "CONNECTED",
        options,
      });
    }, 5000);
  });
} 

@Module({
  controllers: [UsersController],
  providers: [
    {
      provide: "DATABASE_CONNECTION",
      // async provider for database connection
      useFactory: async (options: Record<string, any>) => {
        const connection = await createConnection(options);

        return connection;
      },
      //this db options will be injected into the factory function
      inject: [{token:"DB_OPTIONS", optional: true}],
      // inject: ["DB_OPTIONS"],
      
    },

    {
      provide: "DB_OPTIONS",
      useValue: { url: "localhost", user: "admin", password: "pwd" },
    },
  ],
})
export class AppModule {}
