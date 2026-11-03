<?php

namespace App\Http\Controllers;

use App\Models\CategoriaConteudo;
use App\Models\ConteudoBemEstar;
use App\Models\ProgressoConteudo;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ConteudoBemEstarController extends Controller
{
    public function index(Request $request)
    {
        $filtros = $request->validate([
            'busca' => ['nullable', 'string', 'max:100'],
            'categoria' => [
                'nullable',
                'integer',
                'exists:categorias_conteudo,id',
            ],
        ]);

        $usuarioId = $request->user()->id;

        $consulta = ConteudoBemEstar::query()
            ->where('ativo', true)
            ->with('categoria:id,nome')
            ->withExists([
                'progressos as concluido' => function ($query) use ($usuarioId) {
                    $query->where('user_id', $usuarioId)
                        ->whereNotNull('concluido_em');
                },
            ]);

        if (!empty($filtros['busca'])) {
            $busca = $filtros['busca'];

            $consulta->where(function ($query) use ($busca) {
                $query->where('titulo', 'like', "%{$busca}%")
                    ->orWhere('resumo', 'like', "%{$busca}%");
            });
        }

        if (!empty($filtros['categoria'])) {
            $consulta->where(
                'categoria_conteudo_id',
                $filtros['categoria']
            );
        }

        $conteudos = $consulta
            ->orderBy('titulo')
            ->get();

        $categorias = CategoriaConteudo::query()
            ->whereHas('conteudos', function ($query) {
                $query->where('ativo', true);
            })
            ->orderBy('nome')
            ->get(['id', 'nome']);

        // Calcula o progresso geral do usuário.
        // O total considera todos os conteúdos ativos,
        // independentemente dos filtros de busca ou categoria.
        $totalConteudos = ConteudoBemEstar::query()
            ->where('ativo', true)
            ->count();

        $totalConcluidos = ProgressoConteudo::query()
            ->where('user_id', $usuarioId)
            ->whereNotNull('concluido_em')
            ->whereHas('conteudo', function ($query) {
                $query->where('ativo', true);
            })
            ->count();

        $porcentagem = $totalConteudos > 0
            ? (int) round(
                ($totalConcluidos / $totalConteudos) * 100
            )
            : 0;

        return Inertia::render('conteudos', [
            'conteudos' => $conteudos,
            'categorias' => $categorias,
            'filtros' => [
                'busca' => $filtros['busca'] ?? '',
                'categoria' => $filtros['categoria'] ?? '',
            ],
            'progresso' => [
                'total' => $totalConteudos,
                'concluidos' => $totalConcluidos,
                'porcentagem' => $porcentagem,
            ],
        ]);
    }

    public function show(Request $request, ConteudoBemEstar $conteudo)
    {
        abort_unless($conteudo->ativo, 404);

        $usuarioId = $request->user()->id;

        $conteudo->load([
            'categoria:id,nome,descricao',
            'atividades',
        ]);

        $concluido = ProgressoConteudo::query()
            ->where('user_id', $usuarioId)
            ->where('conteudo_bem_estar_id', $conteudo->id)
            ->whereNotNull('concluido_em')
            ->exists();

        return Inertia::render('conteudo-detalhes', [
            'conteudo' => $conteudo,
            'concluido' => $concluido,
        ]);
    }

    public function concluir(
        Request $request,
        ConteudoBemEstar $conteudo
    ): RedirectResponse {
        abort_unless($conteudo->ativo, 404);

        ProgressoConteudo::updateOrCreate(
            [
                'user_id' => $request->user()->id,
                'conteudo_bem_estar_id' => $conteudo->id,
            ],
            [
                'concluido_em' => now(),
            ]
        );

        return redirect()
            ->route('conteudos.show', $conteudo)
            ->with('success', 'Conteúdo marcado como concluído!');
    }
}
