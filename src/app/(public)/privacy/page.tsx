import React from 'react';
import { Card } from '@/components/ui/Card';

export default function PrivacyPage() {
    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold text-white mb-8 text-center">Política de Privacidad</h1>
            <Card variant="glass" padding="lg" className="prose prose-invert max-w-none">
                <p className="text-slate-300 mb-4">
                    Su privacidad es importante para nosotros. Es política de AgendaGol respetar su privacidad con respecto a cualquier información que podamos recopilar de usted a través de nuestro sitio web.
                </p>

                <h3 className="text-xl font-semibold text-white mt-6 mb-3">1. Información que recopilamos</h3>
                <p className="text-slate-300 mb-4">
                    Solo solicitamos información personal cuando realmente la necesitamos para brindarle un servicio. La recopilamos por medios justos y legales, con su conocimiento y consentimiento. También le informamos por qué la recopilamos y cómo se utilizará.
                </p>

                <h3 className="text-xl font-semibold text-white mt-6 mb-3">2. Uso de la información</h3>
                <p className="text-slate-300 mb-4">
                    Retenemos la información recopilada solo durante el tiempo que sea necesario para brindarle el servicio solicitado. Los datos que almacenamos, los protegeremos dentro de medios comercialmente aceptables para evitar pérdidas y robos, así como el acceso, divulgación, copia, uso o modificación no autorizados.
                </p>

                <h3 className="text-xl font-semibold text-white mt-6 mb-3">3. Compartir información</h3>
                <p className="text-slate-300 mb-4">
                    No compartimos ninguna información de identificación personal públicamente o con terceros, excepto cuando lo exige la ley.
                </p>

                <p className="text-slate-400 text-sm mt-8 border-t border-slate-700 pt-4">
                    Última actualización: Enero 2026
                </p>
            </Card>
        </div>
    );
}
