//este archivo se encarga de la conexion a la base de datos MongoDB usando mongoose 
//no cambiar nada 
//equivale al pool de conexiones en mysql2
import mongoose from 'mongoose';

//ocupa la URI del archivo .env o una local por defecto
const MONGODB_URI =
  process.env.MONGODB_URI || 'mongodb://localhost:27017/veterinaria_db';

  //hace una promesa con funcion arrow mongoose.connect con la URI y maneja errores de conexion
export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ MongoDB conectado exitosamente');
  } catch (error) {
    console.error('❌ Error al conectar MongoDB:', error);
    process.exit(1);
  }
};

mongoose.connection.on('error', (err) => {
  console.error('❌ Error de MongoDB:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('⚠️ MongoDB desconectado');
});

export default mongoose;
