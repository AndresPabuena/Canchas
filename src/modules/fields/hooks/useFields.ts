'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { Field, FieldAvailability, FieldCreate, FieldUpdate } from '@/modules/fields/types';
import { fieldService } from '@/modules/fields/services/fieldService';
import { customToast } from '@/components/UX-UI/CustomToastContainer';

interface UseFieldsReturn {
    fields: Field[];
    selectedField: Field | null;
    availability: FieldAvailability | null;
    isLoading: boolean;
    isLoadingAvailability: boolean;
    error: string | null;
    loadFields: (is_active?: boolean) => Promise<void>;
    loadFieldById: (id: number) => Promise<void>;
    loadAvailability: (fieldId: number, date: string) => Promise<void>;
    selectField: (field: Field | null) => void;
    createField: (data: FieldCreate, token: string) => Promise<Field>;
    updateField: (id: number, data: FieldUpdate, token: string) => Promise<Field>;
    deleteField: (id: number, token: string) => Promise<void>;
}

export const useFields = (): UseFieldsReturn => {
    const [fields, setFields] = useState<Field[]>([]);
    const [selectedField, setSelectedField] = useState<Field | null>(null);
    const [availability, setAvailability] = useState<FieldAvailability | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingAvailability, setIsLoadingAvailability] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Strict mode guard
    const isMounted = useRef(false);

    const loadFields = useCallback(async (is_active?: boolean) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fieldService.getAll({ is_active });
            if (response.success && response.data.fields) {
                const fields = response.data.fields;
                setFields(fields);
            } else {
                throw new Error(response.message);
            }
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Error al cargar las canchas';
            setError(message);
            customToast.error(message);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const loadFieldById = useCallback(async (id: number) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fieldService.getById(id);
            if (response.success) {
                setSelectedField(response.data);
            } else {
                throw new Error(response.message);
            }
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Error al cargar la cancha';
            setError(message);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const loadAvailability = useCallback(async (fieldId: number, date: string) => {
        setIsLoadingAvailability(true);
        try {
            const response = await fieldService.getAvailability(fieldId, date);
            if (response.success) {
                setAvailability(response.data);
            } else {
                throw new Error(response.message);
            }
        } catch (err) {
            // If no availability data, show empty hours
            setAvailability({ field_id: fieldId, date, available_hours: [] });
        } finally {
            setIsLoadingAvailability(false);
        }
    }, []);

    const selectField = useCallback((field: Field | null) => {
        setSelectedField(field);
    }, []);

    // Auto-load fields on mount
    useEffect(() => {
        if (!isMounted.current) {
            isMounted.current = true;
            loadFields();
        }
    }, [loadFields]);

    const createField = useCallback(async (data: FieldCreate, token: string) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fieldService.create(data, { token });
            if (response.success) {
                await loadFields();
                customToast.success('Cancha creada correctamente');
                return response.data;
            } else {
                throw new Error(response.message);
            }
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Error al crear la cancha';
            setError(message);
            customToast.error(message);
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, [loadFields]);

    const updateField = useCallback(async (id: number, data: FieldUpdate, token: string) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fieldService.update(id, data, { token });
            if (response.success) {
                if (selectedField?.id === id) {
                    setSelectedField(response.data);
                }
                await loadFields();
                customToast.success('Cancha actualizada correctamente');
                return response.data;
            } else {
                throw new Error(response.message);
            }
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Error al actualizar la cancha';
            setError(message);
            customToast.error(message);
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, [loadFields, selectedField]);

    const deleteField = useCallback(async (id: number, token: string) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fieldService.delete(id, { token });
            if (response.success) {
                if (selectedField?.id === id) {
                    setSelectedField(null);
                }
                await loadFields();
                customToast.success('Cancha eliminada correctamente');
            } else {
                throw new Error(response.message);
            }
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Error al eliminar la cancha';
            setError(message);
            customToast.error(message);
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, [loadFields, selectedField]);

    return {
        fields,
        selectedField,
        availability,
        isLoading,
        isLoadingAvailability,
        error,
        loadFields,
        loadFieldById,
        loadAvailability,
        selectField,
        createField,
        updateField,
        deleteField,
    };
};
