import path from 'path';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';


const options: TypeOrmModuleOptions = {
    type: 'postgres',
    'host':'localhost',
    'port':5432,
    'username':'postgres',
    'password':'docker',
    'database':'taks',
    'entities': [
        path.resolve(__dirname, '..', 'modules', 'Database', 'entities', '*')
    ],
    'migrations':[
        path.resolve(__dirname, '..', 'modules', 'Database', 'migrations', '*')
    ],
    'cli':{
        'migrationsDir':path.resolve(__dirname, '..', 'modules', 'Database', 'migrations')
    }
}

module.exports = options;