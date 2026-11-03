
import { Head, Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

import PendingInvitationsModal from '@/components/pending-invitations-modal';
import { dashboard } from '@/routes';
import type { DashboardInvitation } from '@/types';

type SentimentoRecente = {
    sentimento: string;
    observacao: string | null;
    created_at: string;
} | null;

type Props = {
    pendingInvitations?: DashboardInvitation[];
    quantidadeSemana?: number;
    sentimentoRecente?: SentimentoRecente;
    contagemEmocoes?: {
        Feliz: number;
        Neutro: number;
        Triste: number;
        Ansioso: number;
    };
};

export default function Dashboard({
    pendingInvitations = [],
    quantidadeSemana = 0,
    sentimentoRecente = null,
    contagemEmocoes = {
        Feliz: 0,
        Neutro: 0,
        Triste: 0,
        Ansioso: 0,
    },
}: Props) {
    const { isAdmin } = usePage<{ isAdmin: boolean }>().props;

    const [showInvitations, setShowInvitations] = useState(
        pendingInvitations.length > 0,
    );

    const emocoes = [
        {
            nome: 'Feliz',
            total: contagemEmocoes.Feliz,
            cor: 'bg-emerald-400',
        },
        {
            nome: 'Neutro',
            total: contagemEmocoes.Neutro,
            cor: 'bg-cyan-400',
        },
        {
            nome: 'Triste',
            total: contagemEmocoes.Triste,
            cor: 'bg-violet-400',
        },
        {
            nome: 'Ansioso',
            total: contagemEmocoes.Ansioso,
            cor: 'bg-rose-400',
        },
    ];

    const maiorValor = Math.max(
        1,
        ...emocoes.map((emocao) => emocao.total),
    );

    const recursos = [
        {
            numero: '01',
            titulo: 'Registrar sentimento',
            descricao:
                'Registre como você está se sentindo e expresse suas emoções.',
            simbolo: '♡',
            cor: 'border-cyan-400',
            link: '/sentimentos',
        },
        {
            numero: '02',
            titulo: 'Histórico emocional',
            descricao:
                'Acompanhe seus registros e observe suas emoções ao longo do tempo.',
            simbolo: '◷',
            cor: 'border-violet-400',
            link: '/historico-emocional',
        },
        {
            numero: '03',
            titulo: 'Assistente virtual',
            descricao:
                'Encontre orientações informativas e caminhos para buscar apoio.',
            simbolo: '✧',
            cor: 'border-sky-400',
            link: '/davi-chat',
        },
        {
            numero: '04',
            titulo: 'Conteúdos de bem-estar',
            descricao:
                'Explore conteúdos sobre autocuidado, empatia e convivência.',
            simbolo: '❀',
            cor: 'border-emerald-400',
            link: '/conteudos',
        },
        {
            numero: '05',
            titulo: 'Solicitar ajuda',
            descricao:
                'Registre uma situação e solicite apoio quando precisar.',
            simbolo: '♡',
            cor: 'border-rose-400',
            link: '/solicitar-ajuda',
        },
        ...(isAdmin
            ? [
                  {
                      numero: '06',
                      titulo: 'Painel administrativo',
                      descricao:
                          'Gerencie os pedidos de ajuda, atualize os status e registre respostas.',
                      simbolo: '⚙',
                      cor: 'border-amber-400',
                      link: '/admin/painel',
                  },
              ]
            : []),
    ];

    return (
        <>
            <Head title="D.A.V.I. | Painel inicial" />

            <PendingInvitationsModal
                invitations={pendingInvitations}
                open={pendingInvitations.length > 0 && showInvitations}
                onOpenChange={setShowInvitations}
            />

            <div className="min-h-full bg-slate-950 p-4 text-white sm:p-6 lg:p-8">
                <section className="mx-auto max-w-7xl">
                    {/* Apresentação */}
                    <div className="overflow-hidden rounded-3xl border border-cyan-400/20 bg-gradient-to-br from-slate-900 via-slate-900 to-cyan-950/60 p-6 sm:p-10">
                        <span className="inline-flex rounded-full border border-cyan-300/30 bg-cyan-300/10 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-cyan-300">
                            Apoio e bem-estar
                        </span>

                        <h1 className="mt-6 max-w-2xl text-3xl font-bold leading-tight sm:text-5xl">
                            Bem-vindo ao{' '}
                            <span className="text-cyan-300">D.A.V.I.</span>
                        </h1>

                        <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
                            Este é o seu espaço de acolhimento, informação e
                            cuidado emocional. Explore os recursos disponíveis
                            e avance no seu ritmo.
                        </p>

                        <a
                            href="#recursos"
                            className="mt-7 inline-flex rounded-xl bg-cyan-300 px-6 py-3 font-bold text-slate-950 transition hover:bg-cyan-200"
                        >
                            Conhecer os recursos
                        </a>
                    </div>

                    {/* Resumo emocional */}
                    <section className="mt-8">
                        <p className="text-sm font-semibold uppercase tracking-widest text-cyan-300">
                            Seu resumo emocional
                        </p>

                        <div className="mt-4 grid gap-5 sm:grid-cols-2">
                            <article className="rounded-2xl border border-cyan-400/20 bg-slate-900 p-6">
                                <p className="text-sm text-slate-400">
                                    Sentimentos registrados nesta semana
                                </p>

                                <p className="mt-3 text-4xl font-bold text-cyan-300">
                                    {quantidadeSemana}
                                </p>

                                <p className="mt-3 text-sm text-slate-400">
                                    {quantidadeSemana === 1
                                        ? 'Você registrou 1 sentimento nesta semana.'
                                        : `Você registrou ${quantidadeSemana} sentimentos nesta semana.`}
                                </p>
                            </article>

                            <article className="rounded-2xl border border-violet-400/20 bg-slate-900 p-6">
                                <p className="text-sm text-slate-400">
                                    Seu sentimento mais recente
                                </p>

                                {sentimentoRecente ? (
                                    <>
                                        <h3 className="mt-3 text-2xl font-bold text-violet-300">
                                            {sentimentoRecente.sentimento}
                                        </h3>

                                        <p className="mt-3 text-sm text-slate-400">
                                            Registrado em{' '}
                                            {new Date(
                                                sentimentoRecente.created_at,
                                            ).toLocaleString('pt-BR')}
                                        </p>

                                        {sentimentoRecente.observacao && (
                                            <p className="mt-3 break-words text-sm leading-6 text-slate-300">
                                                {sentimentoRecente.observacao}
                                            </p>
                                        )}
                                    </>
                                ) : (
                                    <>
                                        <h3 className="mt-3 text-xl font-bold text-violet-300">
                                            Nenhum registro ainda
                                        </h3>

                                        <p className="mt-3 text-sm leading-6 text-slate-400">
                                            Quando você registrar seu primeiro
                                            sentimento, ele aparecerá aqui.
                                        </p>

                                        <Link
                                            href="/sentimentos"
                                            className="mt-4 inline-flex font-semibold text-cyan-300 hover:text-cyan-200"
                                        >
                                            Registrar sentimento →
                                        </Link>
                                    </>
                                )}
                            </article>
                        </div>
                    </section>

                    {/* Gráfico emocional semanal */}
                    <section className="mt-8 rounded-2xl border border-white/10 bg-slate-900 p-6 sm:p-8">
                        <p className="text-sm font-semibold uppercase tracking-widest text-cyan-300">
                            Acompanhamento semanal
                        </p>

                        <h2 className="mt-2 text-2xl font-bold">
                            Suas emoções nesta semana
                        </h2>

                        <p className="mt-2 text-sm leading-6 text-slate-400">
                            Veja quantas vezes cada emoção foi registrada na
                            semana atual.
                        </p>

                        <div className="mt-8 space-y-6">
                            {emocoes.map((emocao) => (
                                <div key={emocao.nome}>
                                    <div className="mb-2 flex items-center justify-between gap-4">
                                        <span className="text-sm font-medium text-slate-200">
                                            {emocao.nome}
                                        </span>

                                        <span className="text-sm font-bold text-white">
                                            {emocao.total}{' '}
                                            {emocao.total === 1
                                                ? 'registro'
                                                : 'registros'}
                                        </span>
                                    </div>

                                    <div
                                        className="h-3 overflow-hidden rounded-full bg-slate-800"
                                        role="progressbar"
                                        aria-label={`Registros de ${emocao.nome}`}
                                        aria-valuemin={0}
                                        aria-valuemax={maiorValor}
                                        aria-valuenow={emocao.total}
                                    >
                                        <div
                                            className={`h-full rounded-full transition-all duration-500 ${emocao.cor}`}
                                            style={{
                                                width: `${(emocao.total / maiorValor) * 100}%`,
                                            }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>

                        {quantidadeSemana === 0 && (
                            <p className="mt-6 text-sm text-slate-400">
                                Você ainda não registrou sentimentos nesta
                                semana. Seus próximos registros aparecerão
                                aqui.
                            </p>
                        )}
                    </section>

                    {/* Recursos */}
                    <div className="mt-10">
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-widest text-cyan-300">
                                Seu espaço
                            </p>

                            <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
                                Como podemos ajudar?
                            </h2>

                            <p className="mt-3 max-w-2xl leading-7 text-slate-400">
                                Escolha uma das áreas abaixo para acessar os
                                recursos disponíveis na plataforma.
                            </p>
                        </div>

                        <div
                            id="recursos"
                            className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3"
                        >
                            {recursos.map((recurso) =>
                                recurso.link ? (
                                    <Link
                                        key={recurso.numero}
                                        href={recurso.link}
                                        className={`block rounded-2xl border border-white/10 border-l-4 ${recurso.cor} bg-slate-900 p-6 transition hover:-translate-y-1 hover:bg-slate-800`}
                                    >
                                        <div className="flex items-start justify-between">
                                            <span className="text-3xl text-cyan-300">
                                                {recurso.simbolo}
                                            </span>

                                            <span className="text-sm text-slate-500">
                                                {recurso.numero}
                                            </span>
                                        </div>

                                        <h3 className="mt-5 text-lg font-bold">
                                            {recurso.titulo}
                                        </h3>

                                        <p className="mt-3 text-sm leading-6 text-slate-400">
                                            {recurso.descricao}
                                        </p>

                                        <p className="mt-5 text-xs font-semibold uppercase tracking-wider text-cyan-300">
                                            Acessar recurso →
                                        </p>
                                    </Link>
                                ) : (
                                    <article
                                        key={recurso.numero}
                                        className={`rounded-2xl border border-white/10 border-l-4 ${recurso.cor} bg-slate-900 p-6 transition hover:-translate-y-1 hover:bg-slate-800`}
                                    >
                                        <div className="flex items-start justify-between">
                                            <span className="text-3xl text-cyan-300">
                                                {recurso.simbolo}
                                            </span>

                                            <span className="text-sm text-slate-500">
                                                {recurso.numero}
                                            </span>
                                        </div>

                                        <h3 className="mt-5 text-lg font-bold">
                                            {recurso.titulo}
                                        </h3>

                                        <p className="mt-3 text-sm leading-6 text-slate-400">
                                            {recurso.descricao}
                                        </p>

                                        <p className="mt-5 text-xs font-semibold uppercase tracking-wider text-cyan-300">
                                            Acessar recurso →
                                        </p>
                                    </article>
                                ),
                            )}
                        </div>
                    </div>

                    {/* Lembrete */}
                    <div className="mt-10 rounded-2xl border border-white/10 bg-slate-900/70 p-6">
                        <h2 className="text-lg font-bold">
                            Um lembrete importante
                        </h2>

                        <p className="mt-3 text-sm leading-7 text-slate-400">
                            Cuidar de si também é importante. O D.A.V.I. tem
                            como objetivo oferecer informação e caminhos de
                            apoio, mas não substitui atendimento profissional.
                        </p>
                    </div>

                    <footer className="py-8 text-center text-xs text-slate-500">
                        D.A.V.I. — Apoio, prevenção e bem-estar.
                    </footer>
                </section>
            </div>
        </>
    );
}

Dashboard.layout = (props: { currentTeam?: { slug: string } | null }) => ({
    breadcrumbs: [
        {
            title: 'Painel inicial',
            href: props.currentTeam ? dashboard(props.currentTeam.slug) : '/',
        },
    ],
});
