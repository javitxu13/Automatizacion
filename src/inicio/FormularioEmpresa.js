import React, { useState, useEffect } from 'react';
import isValidPhoneNumber from 'libphonenumber-js';
import './../style/FormularioEmpresa.css';
import { useNavigate } from 'react-router-dom';
import { db } from '../page/Firebase'; // Asegúrate de que la ruta sea correcta
import { collection, addDoc } from 'firebase/firestore';

// Definición de opciones de países y sus códigos de teléfono
const paisesConCodigo = [
  { codigo: 'ES', nombre: 'España', codigoTelefono: '+34 🇪🇸 '},
  { codigo: 'US', nombre: 'Estados Unidos', codigoTelefono: '+1 🇺🇸' },
  { codigo: 'GB', nombre: 'Reino Unido', codigoTelefono: '+44 🇬🇧' },
  { codigo: 'DE', nombre: 'Alemania', codigoTelefono: '+49 🇩🇪 ' },
  { codigo: 'FR', nombre: 'Francia', codigoTelefono: '+33 🇫🇷' },
  { codigo: 'IT', nombre: 'Italia', codigoTelefono: '+39 🇮🇹' },
  { codigo: 'BR', nombre: 'Brasil', codigoTelefono: '+55 🇧🇷' },
  { codigo: 'JP', nombre: 'Japón', codigoTelefono: '+81 🇯🇵' },
  { codigo: 'CN', nombre: 'China', codigoTelefono: '+86 🇨🇳' },
  { codigo: 'IN', nombre: 'India', codigoTelefono: '+91 🇮🇳' }
];


const FormularioEmpresa = ({ valor = {}, onNext }) => {
  const [formValues, setFormValues] = useState({
    nombreEmpresa: '',
    pais: '',
    telefono: '',
    industria: valor.industria || '',
  });
  const [codigoPais, setCodigoPais] = useState('');
  const [esValido, setEsValido] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const paisSeleccionado = paisesConCodigo.find(p => p.codigo === formValues.pais);
    setCodigoPais(paisSeleccionado ? paisSeleccionado.codigoTelefono : '');
  }, [formValues.pais]);


  useEffect(() => {
    const telefonoCompleto = `${codigoPais}${formValues.telefono}`;
    console.log(`Validando teléfono: ${telefonoCompleto}`);
    setEsValido(isValidPhoneNumber(telefonoCompleto));
  }, [codigoPais, formValues.telefono]);
  
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues(prev => ({ ...prev, [name]: value }));
  };


const camposRequeridosYValidos = () => {
  return formValues.nombreEmpresa.trim();
};

  

  const guardarEnFirestore = async () => {
    if (!camposRequeridosYValidos()) {
      alert('Asegúrese de que todos los campos son válidos y que el número de teléfono es correcto.');
      return;
    }

    try {
      const docRef = await addDoc(collection(db, "empresas"), {
        ...formValues,
        telefono: codigoPais + formValues.telefono,
      });
      console.log("Documento escrito con ID: ", docRef.id);
      if (typeof onNext === 'function') {
        onNext();
      }
      navigate('/dashboard');
    } catch (error) {
      console.error("Error al guardar el documento: ", error);
      alert("Ocurrió un error al guardar. Por favor, intenta de nuevo.");
    }
  };


  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div>
        <label>
          Nombre Empresa:
          <input
            type="text"
            name="nombreEmpresa" // Importante utilizar el atributo name para el manejo de estado
            value={formValues.nombreEmpresa}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
      <label>
        Industria:
        <select
          name="industria"
          value={formValues.industria} // Use formValues.industria to set the current value
          onChange={handleChange} // Use handleChange to manage changes
        >
            <option value="">Seleccione una industria...</option>
            <option value="Administración pública">Administración pública</option>
            <option value="Aeroespacial y defensa">Aeroespacial y defensa</option>
            <option value="Agricultura">Agricultura</option>
            <option value="Alimentación y productos de primera necesidad">Alimentación y productos de primera necesidad</option>
            <option value="Alimentación, bebidas y tabaco">Alimentación, bebidas y tabaco</option>
            <option value="Automóviles y componentes">Automóviles y componentes</option>
            <option value="Banca y seguros">Banca y seguros</option>
            <option value="Bienes de consumo duraderos y prendas de vestir">Bienes de consumo duraderos y prendas de vestir</option>
            <option value="Construcción e ingeniería">Construcción e ingeniería</option>
            <option value="Educación">Educación</option>
            <option value="Empresas comerciales y distribuidores">Empresas comerciales y distribuidores</option>
            <option value="Energía">Energía</option>
            <option value="Envases y embalajes">Envases y embalajes</option>
            <option value="Equipos y servicios sanitarios">Equipos y servicios sanitarios</option>
            <option value="Farmacéutica y biotecnología">Farmacéutica y biotecnología</option>
            <option value="Finanzas diversificadas">Finanzas diversificadas</option>
            <option value="Hardware y equipos tecnológicos">Hardware y equipos tecnológicos</option>
            <option value="Hostelería">Hostelería</option>
            <option value="Inmobiliaria">Inmobiliaria</option>
            <option value="Maquinaria">Maquinaria</option>
            <option value="Materias primas">Materias primas</option>
            <option value="Medios y entretenimiento">Medios y entretenimiento</option>
            <option value="Metales y minería">Metales y minería</option>
            <option value="Militar">Militar</option>
            <option value="Organización sin ánimo de lucro">Organización sin ánimo de lucro</option>
            <option value="Productos químicos">Productos químicos</option>
            <option value="Sector Industrial">Sector Industrial</option>
            <option value="Semiconductores">Semiconductores</option>
            <option value="Servicios al consumidor">Servicios al consumidor</option>
            <option value="Servicios comerciales y profesionales">Servicios comerciales y profesionales</option>
            <option value="Servicios de investigación y consultoría">Servicios de investigación y consultoría</option>
            <option value="Servicios jurídicos">Servicios jurídicos</option>
            <option value="Software y servicios informáticos">Software y servicios informáticos</option>
            <option value="Telecomunicaciones">Telecomunicaciones</option>
            <option value="Transporter">Transporter</option>
            <option value="Utilidades">Utilidades</option>
            <option value="Venta al por menor">Venta al por menor</option>
            <option value="Venta al por menor por Internet y marketing directo">Venta al por menor por Internet y marketing directo</option>
            <option value="Viajes y turismo">Viajes y turismo</option>
            <option value="Otro">Otro</option>
          </select>
        </label>
        </div>
        <div className="input-container">
  <label htmlFor="telefono">Teléfono:</label>
  <div className="phone-input">
    <select
      name="pais"
      value={formValues.pais}
      onChange={handleChange}
      style={{ marginRight: '5px' }}
    >
      <option value="">Seleccione un país...</option>
      {paisesConCodigo.map((pais) => (
        <option key={pais.codigo} value={pais.codigo}>
          {pais.nombre} {pais.codigoTelefono}
        </option>
      ))}
    </select>
    <input
      id="telefono"
      type="text"
      name="telefono"
      value={formValues.telefono}
      onChange={handleChange}
      placeholder="Ingrese su número de teléfono sin el código de país"
    />
  </div>
</div>
<button type="button" onClick={guardarEnFirestore} disabled={!camposRequeridosYValidos()}>
  Siguiente
</button>

    </form>
  );
};

export default FormularioEmpresa;