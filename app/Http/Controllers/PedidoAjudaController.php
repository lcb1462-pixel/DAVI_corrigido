<?php

namespace App\Http\Controllers;

use App\Models\PedidoAjuda;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class PedidoAjudaController extends Controller
{
    public function index()
    {
        $usuarioId = Auth::id();

        $pedidos = PedidoAjuda::where('user_id', $usuarioId)
            ->latest()
            ->get([
                'id',
                'tipo',
                'descricao',
                'status',
                'resposta',
                'resposta_lida_at',
                'created_at',
            ]);

        $notificacoesNovas = $pedidos
            ->filter(fn ($pedido) =>
                !empty($pedido->resposta) &&
                empty($pedido->resposta_lida_at)
            )
            ->count();

        return Inertia::render('solicitar-ajuda', [
            'pedidos' => $pedidos,
            'notificacoesNovas' => $notificacoesNovas,
        ]);
    }

    public function store(Request $request)
    {
        $dados = $request->validate([
            'tipo' => 'required|in:Saúde emocional,Bullying,Assédio,Discriminação,Outro',
            'descricao' => 'required|string|min:10|max:2000',
        ]);

        PedidoAjuda::create([
            'user_id' => Auth::id(),
            'tipo' => $dados['tipo'],
            'descricao' => $dados['descricao'],
            'status' => 'Pendente',
        ]);

        return redirect()
            ->route('solicitar-ajuda.index')
            ->with('success', 'Seu pedido de ajuda foi registrado com sucesso.');
    }

    public function marcarRespostasLidas()
    {
        PedidoAjuda::where('user_id', Auth::id())
            ->whereNotNull('resposta')
            ->where('resposta', '!=', '')
            ->whereNull('resposta_lida_at')
            ->update([
                'resposta_lida_at' => now(),
            ]);

        return redirect()
            ->route('solicitar-ajuda.index')
            ->with('success', 'Respostas visualizadas.');
    }
}
