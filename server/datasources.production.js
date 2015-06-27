module.exports = {
  Mongodb: {
    name: 'Mongodb',
    connector: 'mongodb',
    database: process.env.MONGO_DB,
    user: process.env.MONGO_USER,
    password: process.env.MONGO_USER
  }
};