import React, { useState, useEffect } from 'react';
import isValidPhoneNumber from 'libphonenumber-js';
import { useNavigate } from 'react-router-dom';

// Considera mover esta constante a un archivo de configuración o utilidad para reutilizarla y mejorar la organización del código.
const paisesConCodigo = [
  { codigo: 'ES', nombre: 'España', codigoTelefono: '+34', digitosEsperados: 9 },
  // Otros países...
];

const opcionesIndustria = [
  "Administración pública",
  "Aeroespacial y defensa",
  "Administración pública",
  "Aeroespacial y defensa",
  "Agricultura",
  "Alimentación y productos de primera necesidad",
  "Alimentación, bebidas y tabaco",
  "Automóviles y componentes",
  "Banca y seguros",
  "Bienes de consumo duraderos y prendas de vestir",
  "Educación",
  "Empresas comerciales y distribuidores",
  "Energía",
  "Envases y embalajes",
  "Equipos y servicios sanitarios",
  "Farmacéutica y biotecnología",
  "Finanzas diversificadas",
  "Hardware y equipos tecnológicos",
  "Hostelería",
  "Inmobiliaria",
  "Maquinaria",
  "Materias primas",
  "Medios y entretenimiento",
  "Metales y minería",
  "Militar",
  "Organización sin ánimo de lucro",
  "Sector Industrial",
  "Semiconductores",
  "Servicios al consumidor",
  "Servicios comerciales y profesionales",
  "Servicios de investigación y consultoría",
  "Servicios jurídicos",
  "Software y servicios informáticos",
  "Telecomunicaciones",
  "Transporter",
  "Utilidades",
  "Venta al por menor",
  "Venta al por menor por Internet y marketing directo",
  "Otro"
];

function FormularioEmpresa({ valorInicial = {} }) {
  const navigate = useNavigate();
  const [botonHabilitado, setBotonHabilitado] = useState(false);
  const [formValues, setFormValues] = useState({
    nombreEmpresa: '',
    pais: '',
    telefono: '',
    industria: valorInicial.industria || '',
    codigoPais: '',
  });

  useEffect(() => {
    const paisSeleccionado = paisesConCodigo.find(p => p.codigo === formValues.pais);
    setFormValues(prev => ({
      ...prev,
      codigoPais: paisSeleccionado ? paisSeleccionado.codigoTelefono : '',
    }));
  }, [formValues.pais]);

  useEffect(() => {
    const validarCampos = () => {
      const { nombreEmpresa, pais, telefono, codigoPais } = formValues;
      const nombreValido = nombreEmpresa.trim() !== '';
      const paisValido = pais.trim() !== '';
      const telefonoValido = telefono.trim() !== '' && isValidPhoneNumber(`${codigoPais}${telefono}`, pais);
      return nombreValido && paisValido && telefonoValido;
    };

    setBotonHabilitado(validarCampos());
  }, [formValues]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormValues(prev => ({ ...prev, [name]: value }));
  };

  const guardarEmpresa = async () => {
    try {
      await fetch('http://localhost:5009/api/empresa', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formValues),
      });
      navigate('/dashboard');
    } catch (error) {
      console.error("Error al guardar la empresa:", error);
    }
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      {/* Nombre de la empresa */}
      <div>
        <label>
          Nombre Empresa:
          <input
            type="text"
            name="nombreEmpresa"
            value={formValues.nombreEmpresa}
            onChange={handleChange}
          />
        </label>
      </div>

      {/* Industria */}
      <div>
        <label>
          Industria:
          <select
            name="industria"
            value={formValues.industria}
            onChange={handleChange}
          >
            <option value="">Seleccione una industria...</option>
            {opcionesIndustria.map(industria => (
              <option key={industria} value={industria}>{industria}</option>
            ))}
          </select>
        </label>
      </div>

      {/* Teléfono y País */}
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
            {paisesConCodigo.map(pais => (
              <option key={pais.codigo} value={pais.codigo}>
                {pais.nombre} {pais.codigoTelefono}
              </option>
            ))}
          </select>
          <input
            type="tel"
            name="telefono"
            value={formValues.telefono}
            onChange={handleChange}
            pattern="\d*"
            placeholder="Ingrese su número de teléfono"
            style={{ marginLeft: '5px' }}
          />
        </div>
      </div>
      <button type="button" onClick={guardarEmpresa} disabled={!botonHabilitado}>
        Siguiente
      </button>
    </form>
  );
}

export default FormularioEmpresa;
