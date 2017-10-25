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
            user : 'v4dbuser',
            password : 'v4dbuser',
            database : 'v4dbtodos'
          },
        migrations: {
            directory: __dirname + '/db/migrations',
        },
        seeds: {
            directory: __dirname + '/db/seeds',
        },        
    },
};
