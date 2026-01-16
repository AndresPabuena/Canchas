'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { Reservation, CreateReservationRequest, CancelReservationRequest } from '@/modules/reservations/types';
import { reservationService } from '@/modules/reservations/services/reservationService';
import { useAuthStore } from '@/store/authStore';
import Swal from 'sweetalert2';
import { customToast } from '@/components/UX-UI/CustomToastContainer';

interface UseReservationsReturn {
    reservations: Reservation[];
    activeReservations: Reservation[];
    cancelledReservations: Reservation[];
    isLoading: boolean;
    error: string | null;
    loadReservations: () => Promise<void>;
    createReservation: (data: CreateReservationRequest) => Promise<boolean>;
    cancelReservation: (id: number, reason?: string) => Promise<boolean>;
}

export const useReservations = (): UseReservationsReturn => {
    const { token, isAuthenticated } = useAuthStore();
    const [reservations, setReservations] = useState<Reservation[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Strict mode guard
    const isMounted = useRef(false);

    // Filter reservations by status
    const activeReservations = reservations.filter(r => r.status === 'confirmada');
    const cancelledReservations = reservations.filter(r => r.status === 'cancelada');

    const loadReservations = useCallback(async () => {
        if (!token) return;

        setIsLoading(true);
        setError(null);
        try {
            const response = await reservationService.getMyReservations({ token });
            if (response.success && response.data.reservations) {
                // Sort by start_time descending (most recent first)
                const sorted = response.data.reservations.sort((a, b) =>
                    new Date(b.start_time).getTime() - new Date(a.start_time).getTime()
                );
                setReservations(sorted);
            } else {
                throw new Error(response.message);
            }
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Error al cargar las reservas';
            setError(message);
        } finally {
            setIsLoading(false);
        }
    }, [token]);

    const createReservation = useCallback(async (data: CreateReservationRequest): Promise<boolean> => {
        if (!token) {
            customToast.warning('Inicia sesión para hacer una reserva');
            return false;
        }

        setIsLoading(true);
        try {
            const response = await reservationService.create(data, { token });

            if (response.success) {
                customToast.success('¡Reserva confirmada! Tu reserva ha sido creada exitosamente');
                await loadReservations();
                return true;
            } else {
                throw new Error(response.message);
            }
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Error al crear la reserva';
            customToast.error(message);
            return false;
        } finally {
            setIsLoading(false);
        }
    }, [token, loadReservations]);

    const cancelReservation = useCallback(async (id: number, reason?: string): Promise<boolean> => {
        if (!token) return false;

        const result = await Swal.fire({
            icon: 'warning',
            title: '¿Cancelar reserva?',
            text: 'Esta acción no se puede deshacer',
            showCancelButton: true,
            confirmButtonText: 'Sí, cancelar',
            cancelButtonText: 'No, mantener',
            background: '#1e293b',
            color: '#fff',
            confirmButtonColor: '#ef4444',
        });

        if (!result.isConfirmed) return false;

        setIsLoading(true);
        try {
            const response = await reservationService.cancel(id, { reason }, { token });

            if (response.success) {
                customToast.success('Reserva cancelada');
                await loadReservations();
                return true;
            } else {
                throw new Error(response.message);
            }
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Error al cancelar la reserva';
            customToast.error(message);
            return false;
        } finally {
            setIsLoading(false);
        }
    }, [token, loadReservations]);

    // Auto-load reservations when authenticated
    useEffect(() => {
        if (!isMounted.current && isAuthenticated && token) {
            isMounted.current = true;
            loadReservations();
        }
    }, [isAuthenticated, token, loadReservations]);

    return {
        reservations,
        activeReservations,
        cancelledReservations,
        isLoading,
        error,
        loadReservations,
        createReservation,
        cancelReservation,
    };
};
