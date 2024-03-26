import React, { useContext, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { DepartamentoContext } from './DepartamentoContext'; // Asegúrate de tener la ruta correcta

const useForm = (initialValues) => {
  const [values, setValues] = useState(initialValues);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  return [values, handleChange, setValues];
};

const AñadirColaboradores = () => {
    const [formData, handleChange, setFormData] = useForm({ nombre: '', error: '', cargando: false, mensajeExito: '' });
    const navigate = useNavigate();
    const location = useLocation();
    const { departamentoId } = location.state || {};
    const { onAgregarColaborador } = useContext(DepartamentoContext); // Asumiendo que esta función está implementada

    useEffect(() => {
        if (!departamentoId) {
            setFormData(prev => ({ ...prev, error: 'No se ha seleccionado un departamento válido.' }));
        }
    }, [departamentoId, setFormData]);

    const isValidForm = () => formData.nombre.trim().length > 0;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isValidForm()) {
            setFormData(prev => ({ ...prev, error: 'Por favor, ingrese un nombre válido para el colaborador.', mensajeExito: '' }));
            return;
        }
        setFormData(prev => ({ ...prev, cargando: true }));
    
        // Asegúrate de que onAgregarColaborador maneje correctamente el departamentoId
        const result = await onAgregarColaborador(formData.nombre, departamentoId); // Asegúrate de que esta función sea asíncrona si hace una llamada al backend
        
        if (result) {
            setFormData({ nombre: '', error: '', cargando: false, mensajeExito: 'Colaborador añadido con éxito' });
            setTimeout(() => navigate('/organizacion'), 2000);
        } else {
            setFormData(prev => ({ ...prev, error: 'Error al añadir colaborador', cargando: false, mensajeExito: '' }));
        }
    };
    
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Nombre del Colaborador:
                    <input
                        type="text"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        disabled={formData.cargando}
                    />
                </label>
                <button type="submit" disabled={formData.cargando || !isValidForm()}>
                    {formData.cargando ? 'Añadiendo...' : 'Añadir Colaborador'}
                </button>
                {formData.error && <p className="error">{formData.error}</p>}
                {formData.mensajeExito && <p className="success">{formData.mensajeExito}</p>}
            </form>
        </div>
    );
};

export default AñadirColaboradores;
