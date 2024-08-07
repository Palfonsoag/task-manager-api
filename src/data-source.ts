import { DataSource } from 'typeorm';
import { DataSourceOptions } from "typeorm/data-source/DataSourceOptions";

export const dataSource: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'tasks-management',
  entities: ['src/**/*.entity.{ts,js}'],
  migrations: ['src/db/migrations/*.{ts,js}'],
};

export default new DataSource({
  ...dataSource,
});
