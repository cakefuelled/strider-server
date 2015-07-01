module.exports = {
  Mongodb: {
    name: 'Mongodb',
    connector: 'mongodb',
    database: 'strider',
    host: process.env.OPENSHIFT_MONGODB_DB_HOST,
    port: process.env.OPENSHIFT_MONGODB_DB_PORT,
    user: process.env.OPENSHIFT_MONGODB_DB_USERNAME,
    password: process.env.OPENSHIFT_MONGODB_DB_PASSWORD
  }
};