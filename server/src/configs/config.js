const { Sequelize } = require('sequelize')

let sequelize
const connectDatabase = () => {
  try {
    if (sequelize) {
      return sequelize
    }
    sequelize = new Sequelize(configDB.database, configDB.username, configDB.password, {
      host: configDB.host,
      dialect: 'mysql',
      logging: false,
      port: configDB.port,
      query: {
        raw: true,
      },
      timezone: '+07:00',
    })
    sequelize.authenticate()
    console.log('Connection has been established successfully.')
    return sequelize
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}

const configDB = {
  host: process.env.HOST_DB || '127.0.0.1',
  username: process.env.USERNAME_SQL || 'root',
  password: process.env.PASSWORD_SQL || 'ngovanbang',
  database: process.env.DB_NAME || 'accommodation-finder',
  port: +process.env.DB_PORT || 3306,
}
const httpCodes = {
  SUCCESS: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  INVALID_ACCESS_TOKEN: 403,
  TOKEN_EXPIRED: 409,
  UNKNOWN_ERROR: 520,
  UNAUTHORIZED: 401,
}

const serverSettings = {
  port: process.env.PORT || 8006,
  basePath: process.env.BASE_PATH || '',
}

const kindOfTimeConfig = {
  1: 'ngày',
  2: 'tuần',
  3: 'tháng',
}

module.exports = {
  connectDatabase,
  httpCodes,
  serverSettings,
  kindOfTimeConfig,
  configDB,
}
