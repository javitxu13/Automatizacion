import React, { useContext, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { DepartamentoContext } from './DepartamentoContext';

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
    const { onAgregarColaborador } = useContext(DepartamentoContext);

    useEffect(() => {
        if (!departamentoId) {
            setFormData(prev => ({ ...prev, error: 'No se ha seleccionado un departamento válido.' }));
        }
    }, [departamentoId, setFormData]);

    const isValidForm = () => formData.nombre.trim().length > 0;

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isValidForm()) {
            setFormData(prev => ({ ...prev, error: 'Por favor, ingresa todos los campos requeridos.' }));
            return;
        }

        setFormData(prev => ({ ...prev, cargando: true, error: '', mensajeExito: '' }));
        
        try {
            const response = await fetch('http://localhost:5009/api/colaboradores', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nombre: formData.nombre, departamentoId }),
            });
    
            if (!response.ok) throw new Error('Error al añadir el colaborador');
    
            setFormData({ nombre: '', error: '', cargando: false, mensajeExito: 'Colaborador añadido con éxito.' });
            setTimeout(() => navigate('/departamentos'), 2000); // Redirige después de mostrar mensaje de éxito
        } catch (error) {
            setFormData(prev => ({ ...prev, cargando: false, error: error.message }));
        }
    };

    return (
        <div className="añadir-colaborador-container">
            <form onSubmit={handleSubmit} className="añadir-colaborador-form">
                <label htmlFor="nombre">
                    Nombre del Colaborador:
                    <input
                        id="nombre"
                        type="text"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        disabled={formData.cargando}
                        className={formData.error && 'input-error'}
                    />
                </label>
                <button type="submit" disabled={formData.cargando || !isValidForm()} className="submit-button">
                    {formData.cargando ? 'Añadiendo...' : 'Añadir Colaborador'}
                </button>
                {formData.error && <p className="error-message">{formData.error}</p>}
                {formData.mensajeExito && <p className="success-message">{formData.mensajeExito}</p>}
            </form>
        </div>
    );
};

export default AñadirColaboradores;
