import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { DepartamentoContext } from './DepartamentoContext';

const AñadirColaboradores = () => {
    const { onAgregarEmpleadoADepartamento } = useContext(DepartamentoContext);
    const [formData, setFormData] = useState({
        nombre: '',
        error: '',
        cargando: false,
    });
    const navigate = useNavigate();
    const location = useLocation();
    const departamentoId = location.state?.departamentoId;

    useEffect(() => {
        if (!departamentoId) {
            setFormData(prev => ({ ...prev, error: 'No se ha seleccionado un departamento válido.' }));
        }
    }, [departamentoId]);

    const isValidForm = () => formData.nombre.trim().length > 0;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isValidForm()) {
            setFormData(prev => ({ ...prev, error: 'Por favor, ingrese un nombre válido para el colaborador.' }));
            return;
        }
        setFormData(prev => ({ ...prev, cargando: true }));

        try {
            await onAgregarEmpleadoADepartamento(departamentoId, { nombre: formData.nombre });
            alert('Colaborador añadido con éxito');
            navigate('/organizacion');
        } catch (error) {
            setFormData(prev => ({ ...prev, error: `Hubo un problema al añadir el colaborador: ${error.message}`, cargando: false }));
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Nombre del Colaborador:
                    <input
                        type="text"
                        value={formData.nombre}
                        onChange={(e) => setFormData(prev => ({ ...prev, nombre: e.target.value }))}
                        disabled={formData.cargando}
                    />
                </label>
                <button type="submit" disabled={formData.cargando || !isValidForm()}>
                {formData.cargando ? 'Añadiendo...' : 'Añadir Colaborador'}
                </button>

            </form>
            {formData.error && <p className="error">{formData.error}</p>}
        </div>
    );
};

export default AñadirColaboradores;
