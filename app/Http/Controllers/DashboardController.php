<?php

namespace App\Http\Controllers;

use App\Models\Sentimento;
use App\Models\TeamInvitation;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function __invoke(Request $request): Response
    {
        $email = strtolower($request->user()->email);

        // Convites pendentes
        $pendingInvitations = TeamInvitation::query()
            ->with(['inviter', 'team'])
            ->whereRaw('LOWER(email) = ?', [$email])
            ->whereNull('accepted_at')
            ->where(fn ($query) => $query
                ->whereNull('expires_at')
                ->orWhere('expires_at', '>=', now()))
            ->latest()
            ->get()
            ->map(fn (TeamInvitation $invitation) => [
                'code' => $invitation->code,
                'inviterName' => $invitation->inviter->name,
                'team' => [
                    'name' => $invitation->team->name,
                    'slug' => $invitation->team->slug,
                ],
            ]);

        // Quantidade de sentimentos registrados nesta semana
        $quantidadeSemana = Sentimento::query()
            ->where('user_id', $request->user()->id)
            ->whereBetween('created_at', [
                now()->startOfWeek(),
                now(),
            ])
            ->count();

        // Sentimento mais recente do usuário conectado
        $sentimentoRecente = Sentimento::query()
            ->where('user_id', $request->user()->id)
            ->latest()
            ->first([
                'sentimento',
                'observacao',
                'created_at',
            ]);

        // Inicializa todas as emoções com zero
        $contagemEmocoes = [
            'Feliz' => 0,
            'Neutro' => 0,
            'Triste' => 0,
            'Ansioso' => 0,
        ];

        // Conta cada emoção registrada nesta semana
        $contagensBanco = Sentimento::query()
            ->selectRaw('sentimento, COUNT(*) as total')
            ->where('user_id', $request->user()->id)
            ->whereBetween('created_at', [
                now()->startOfWeek(),
                now(),
            ])
            ->groupBy('sentimento')
            ->get();

        foreach ($contagensBanco as $item) {
            if (array_key_exists($item->sentimento, $contagemEmocoes)) {
                $contagemEmocoes[$item->sentimento] = (int) $item->total;
            }
        }

        // Envia os dados para a página React
        return Inertia::render('dashboard', [
            'pendingInvitations' => $pendingInvitations,
            'quantidadeSemana' => $quantidadeSemana,
            'sentimentoRecente' => $sentimentoRecente,
            'contagemEmocoes' => $contagemEmocoes,
        ]);
    }
}
