import config from '.'
export const connectionOptions = {
  autoIndex: config.NODE_ENV !== 'production', // dont build indexes in production
  serverSelectionTimeoutMS: 30000, // timeout after 5 seconds of inactivity during server selection
  socketTimeoutMS: 45000, // close sockets after 45 seconds of inactivity
  family: 4, // use IPv4, skip trying IPv6
  maxPoolSize: 30,
}
