import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { DepartamentoContext } from './DepartamentoContext';

const AñadirColaboradores = () => {
    const [formData, setFormData] = useState({
        nombre: '',
        error: '',
        cargando: false,
    });
    const { onAgregarEmpleadoADepartamento, departamentos } = useContext(DepartamentoContext);
    const navigate = useNavigate();
    const location = useLocation();
    const departamentoSeleccionado = location.state?.departamentoId;

    useEffect(() => {
        if (!departamentoSeleccionado || !departamentos.length) {
            setFormData(prev => ({ ...prev, error: 'No se ha seleccionado un departamento válido o no hay departamentos cargados.' }));
        }
    }, [departamentoSeleccionado, departamentos]);

    const isValidForm = () => formData.nombre.trim().length > 0;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isValidForm()) {
            setFormData(prev => ({ ...prev, error: 'Por favor, ingrese un nombre válido para el colaborador.' }));
            return;
        }
        setFormData(prev => ({ ...prev, cargando: true }));

        try {
            const response = await fetch('http://localhost:5009/api/colaboradores', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nombre: formData.nombre, departamentoId: departamentoSeleccionado }),
            });
            if (!response.ok) {
                throw new Error(`Error en la respuesta: ${response.status}`);
            }
            const nuevoColaborador = await response.json();
            onAgregarEmpleadoADepartamento(departamentoSeleccionado, nuevoColaborador);
            alert('Colaborador añadido con éxito');
            navigate('/organizacion');
        } catch (error) {
            setFormData(prev => ({ ...prev, error: `Hubo un problema al añadir el colaborador: ${error.message}` }));
        } finally {
            setFormData(prev => ({ ...prev, cargando: false, nombre: '' }));
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
