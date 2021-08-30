import { TypeOrmModuleOptions } from '@nestjs/typeorm';

console.log(__dirname);
const config: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: +(process.env.DB_PORT || 5432),
  username: process.env.DB_USERNAME || 'test',
  password: process.env.DB_PASSWORD || 'test',
  database: process.env.DB_DATABASE || 'test',
  autoLoadEntities: true,
  synchronize: false,
  logging: true,
  keepConnectionAlive: true,
  entities: [__dirname + '/entity/*.{ts,js}'],
  migrations: [__dirname + '/migration/*.{ts,js}'],
  subscribers: [__dirname + '/subscriber/*.{ts,js}'],
  cli: {
    entitiesDir: 'src/entity',
    migrationsDir: 'src/migration',
    subscribersDir: 'src/subscriber',
  },
};

export = config;
