https://www.youtube.com/watch?v=5_CJIWy8uE0&list=PLG3j59vX4yLHA-wCw7KDP-i0r10ZrckqG

npm init --y

npm i express sequelize mysql2

sequelize init

sequelize model:generate --name Post --attributes title:string,content:text,imageUrl:string, categoryId: integer,userId:integer;

sequelize model:generate --name User --attributes name:string,email:string,password:string;

sequelize model:generate --name Category --attributes name:string;

sequelize db:migrate



