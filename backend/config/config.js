export default {
  PORT: process.env.PORT || 5050,
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb+srv://krishjaiswal67890:Krish67890@cluster0.4bzzc6t.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
  JWT_SECRET: process.env.JWT_SECRET || 'secretkey123456789',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '30d'
}; 