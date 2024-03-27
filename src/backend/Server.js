require('dotenv').config(); // Manejo de variables de entorno
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();


app.use(express.json());
app.use(cors());

// Importación de rutas
//const paymentRoutes = require('./routes/paymentRoutes');
const loginRoutes = require('./routes/loginRoutes');
const registerRoutes = require('./routes/registerRoutes');
const empresaRoutes = require('./routes/empresaRoutes');
const nombreRoutes = require('./routes/nombreRoutes');
const rolRoutes = require('./routes/rolRoutes');
const procesoRoutes = require('./routes/procesoRoutes');
const departamentoRoutes = require('./routes/departamentoRoutes');
const colaboradoresRoutes = require('./routes/colaboradoresRoutes');


// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI, { authSource: 'admin' })
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error al conectar con MongoDB:', err));

// Definición de rutas
app.use('/api/login', loginRoutes);
app.use('/api/register', registerRoutes);
//app.use('/api/payment', paymentRoutes);
app.use('/api/empresa', empresaRoutes);
app.use('/api/usuarios', nombreRoutes);
app.use('/api/rol', rolRoutes);
app.use('/api/procesos', procesoRoutes);
app.use('/api/departamentos', departamentoRoutes);
app.use('/api/colaboradores', colaboradoresRoutes);

app.get('/', (req, res) => {
  res.send('El servidor está corriendo correctamente.');
});
// Manejo centralizado de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Algo salió mal!');
});

// Iniciar servidor
const PORT = process.env.PORT || 5009;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
