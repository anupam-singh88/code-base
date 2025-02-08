npm i sequelize 

packdriver pg or sql2

create a file .sequelizerc [for addressing the location of the file]

npx sequelize-cli init

npx sequelize-cli db:create

npx sequelize-cli model:generate --name user --attributes userType:ENUM,firstName:string,lastName:string, email:string, password:string

npx sequelize-cli db:migrate