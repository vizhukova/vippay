// Update with your config settings.

module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      host: '192.168.1.48',
      database: 'vippay',
      user:     'vippay',
      password: '25801379'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      host: '192.168.1.48',
      database: 'vippay',
      user:     'vippay',
      password: '25801379'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      host: '192.168.1.48',
      database: 'vippay',
      user:     'vippay',
      password: '25801379'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
