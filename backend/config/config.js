export default {
  PORT: process.env.PORT || 5050,
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/taskmanagement',
  JWT_SECRET: process.env.JWT_SECRET || 'secretkey123456789',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '30d'
}; 