module.exports = {
    development: {
        client: 'mysql',
        connection: {
            host : 'godzilla',
            user : 'webuser',
            password : 'webuser',
            database : 'v4dev'
          },
        migrations: {
            directory: __dirname + '/db/migrations',
        },
        seeds: {
            directory: __dirname + '/db/seeds',
        },        
    },
    production: {
        client: 'mysql',
        connection: {
            host : 'localhost',
            user : 'webuser',
            password : 'webuser',
            database : 'todos'
          },
        migrations: {
            directory: __dirname + '/db/migrations',
        },
        seeds: {
            directory: __dirname + '/db/seeds',
        },        
    },
};