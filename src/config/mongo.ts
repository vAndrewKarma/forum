import config from '.'
export const connectionOptions = {
  autoIndex: config.NODE_ENV !== 'production', // Don't build indexes in production
  serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds of inactivity during server selection
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  family: 4, // Use IPv4, skip trying IPv6
}
