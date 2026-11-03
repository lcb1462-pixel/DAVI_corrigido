<?php

namespace App\Http\Controllers;

use App\Models\ConversaDavi;
use App\Services\GeminiService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Throwable;

class DaviChatController extends Controller
{
    public function index(Request $request): Response
    {
        $conversas = ConversaDavi::query()
            ->where('user_id', $request->user()->id)
            ->withCount('mensagens')
            ->orderByDesc('updated_at')
            ->get();

        return Inertia::render('davi-chat', [
            'conversas' => $conversas,
            'conversa' => null,
            'mensagens' => [],
        ]);
    }

    public function show(
        Request $request,
        ConversaDavi $conversa
    ): Response {
        abort_unless(
            $conversa->user_id === $request->user()->id,
            403
        );

        $conversas = ConversaDavi::query()
            ->where('user_id', $request->user()->id)
            ->withCount('mensagens')
            ->orderByDesc('updated_at')
            ->get();

        $mensagens = $conversa->mensagens()
            ->orderBy('id')
            ->get();

        return Inertia::render('davi-chat', [
            'conversas' => $conversas,
            'conversa' => $conversa,
            'mensagens' => $mensagens,
        ]);
    }

    public function criar(Request $request): RedirectResponse
    {
        $conversa = ConversaDavi::create([
            'user_id' => $request->user()->id,
            'titulo' => 'Nova conversa',
        ]);

        return redirect()->route(
            'davi.chat.show',
            $conversa
        );
    }

    public function enviar(
        Request $request,
        ConversaDavi $conversa,
        GeminiService $gemini
    ): RedirectResponse {
        abort_unless(
            $conversa->user_id === $request->user()->id,
            403
        );

        $dados = $request->validate([
            'mensagem' => ['required', 'string', 'max:4000'],
        ]);

        $texto = trim($dados['mensagem']);

        if ($texto === '') {
            return back()->withErrors([
                'mensagem' => 'Digite uma mensagem antes de enviar.',
            ]);
        }

        $conversa->mensagens()->create([
            'remetente' => 'usuario',
            'mensagem' => $texto,
        ]);

        if ($conversa->titulo === 'Nova conversa') {
            $conversa->titulo = mb_substr($texto, 0, 150);
        }

        $conversa->save();

        try {
            $resposta = $gemini->enviarMensagem($texto);

            $conversa->mensagens()->create([
                'remetente' => 'davi',
                'mensagem' => $resposta,
            ]);

            $conversa->touch();
        } catch (Throwable $erro) {
            report($erro);

            return back()->withErrors([
                'mensagem' => 'Não foi possível obter uma resposta agora. Tente novamente.',
            ]);
        }

        return redirect()->route(
            'davi.chat.show',
            $conversa
        );
    }

    public function excluir(
        Request $request,
        ConversaDavi $conversa
    ): RedirectResponse {
        // Permite excluir somente conversas do próprio usuário.
        abort_unless(
            $conversa->user_id === $request->user()->id,
            403
        );

        // Exclui as mensagens relacionadas à conversa.
        $conversa->mensagens()->delete();

        // Exclui a conversa.
        $conversa->delete();

        return redirect()->route('davi.chat.index')
            ->with('success', 'Conversa excluída com sucesso.');
    }
}
