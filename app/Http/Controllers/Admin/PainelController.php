<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\PedidoAjuda;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PainelController extends Controller
{
    public function index(Request $request): Response
    {
        $consulta = PedidoAjuda::with('user')->latest();

        if ($request->filled('status')) {
            $consulta->where('status', $request->status);
        }

        if ($request->filled('tipo')) {
            $consulta->where('tipo', $request->tipo);
        }

        $pedidos = $consulta->paginate(10)->withQueryString()->through(
            function (PedidoAjuda $pedido) {
                return [
                    'id' => $pedido->id,
                    'tipo' => $pedido->tipo,
                    'descricao' => $pedido->descricao,
                    'status' => $pedido->status,
                    'resposta' => $pedido->resposta,
                    'created_at' => $pedido->created_at?->toISOString(),
                    'usuario' => $pedido->user?->name ?? 'Usuário não encontrado',
                ];
            }
        );

        return Inertia::render('admin/painel', [
            'pedidos' => $pedidos,
            'filtros' => [
                'status' => $request->status ?? '',
                'tipo' => $request->tipo ?? '',
            ],
            'estatisticas' => [
                'total' => PedidoAjuda::count(),
                'pendentes' => PedidoAjuda::where('status', 'Pendente')->count(),
                'em_analise' => PedidoAjuda::where('status', 'Em análise')->count(),
                'resolvidos' => PedidoAjuda::where('status', 'Resolvido')->count(),
            ],
        ]);
    }

    public function atualizar(
        Request $request,
        PedidoAjuda $pedido
    ): \Illuminate\Http\RedirectResponse {
        $dados = $request->validate([
            'status' => 'required|in:Pendente,Em análise,Resolvido',
            'resposta' => 'nullable|string|max:5000',
        ]);

        $respostaAnterior = $pedido->resposta;
        $novaResposta = $dados['resposta'] ?? null;

        $pedido->update([
            'status' => $dados['status'],
            'resposta' => $novaResposta,
        ]);

        if (
            filled($novaResposta) &&
            $novaResposta !== $respostaAnterior
        ) {
            $pedido->resposta_lida_at = null;
            $pedido->save();
        }

        return redirect()
            ->back()
            ->with('success', 'Pedido atualizado com sucesso.');
    }
}