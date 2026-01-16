import React from 'react';
import { Card } from '@/components/ui/Card';

export default function TermsPage() {
    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold text-white mb-8 text-center">Términos y Condiciones</h1>
            <Card variant="glass" padding="lg" className="prose prose-invert max-w-none">
                <p className="text-slate-300 mb-4">
                    Bienvenido a AgendaGol. Al acceder a nuestro sitio web, usted acepta estar sujeto a estos términos de servicio, a todas las leyes y regulaciones aplicables, y acepta que es responsable del cumplimiento de cualquier ley local aplicable.
                </p>

                <h3 className="text-xl font-semibold text-white mt-6 mb-3">1. Licencia de uso</h3>
                <p className="text-slate-300 mb-4">
                    Se concede permiso para descargar temporalmente una copia de los materiales (información o software) en el sitio web de AgendaGol para visualización transitoria personal y no comercial únicamente.
                </p>

                <h3 className="text-xl font-semibold text-white mt-6 mb-3">2. Renuncia</h3>
                <p className="text-slate-300 mb-4">
                    Los materiales en el sitio web de AgendaGol se proporcionan "tal cual". AgendaGol no ofrece garantías, expresas o implícitas, y por la presente renuncia y niega todas las demás garantías, incluidas, entre otras, las garantías implícitas o condiciones de comerciabilidad.
                </p>

                <h3 className="text-xl font-semibold text-white mt-6 mb-3">3. Limitaciones</h3>
                <p className="text-slate-300 mb-4">
                    En ningún caso AgendaGol o sus proveedores serán responsables de ningún daño (incluidos, entre otros, daños por pérdida de datos o ganancias, o debido a la interrupción del negocio) que surjan del uso o la incapacidad de usar los materiales en el sitio web de AgendaGol.
                </p>

                <p className="text-slate-400 text-sm mt-8 border-t border-slate-700 pt-4">
                    Última actualización: Enero 2026
                </p>
            </Card>
        </div>
    );
}
