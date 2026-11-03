
<?php

use App\Http\Controllers\Admin\PainelController;
use App\Http\Controllers\ConteudoBemEstarController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DaviChatController;
use App\Http\Controllers\PedidoAjudaController;
use App\Http\Controllers\SentimentoController;
use App\Http\Controllers\Teams\TeamInvitationController;
use App\Http\Middleware\AdminMiddleware;
use App\Http\Middleware\EnsureTeamMembership;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::inertia('/', 'welcome')->name('home');

/*
|--------------------------------------------------------------------------
| Rotas administrativas
|--------------------------------------------------------------------------
*/
Route::middleware(['auth', AdminMiddleware::class])
    ->prefix('admin')
    ->name('admin.')
    ->group(function () {
        Route::get('/painel', [
            PainelController::class,
            'index',
        ])->name('painel');

        Route::put('/pedidos/{pedido}', [
            PainelController::class,
            'atualizar',
        ])->name('pedidos.atualizar');
    });

/*
|--------------------------------------------------------------------------
| Dashboard da equipe
|--------------------------------------------------------------------------
*/
Route::prefix('{current_team}')
    ->middleware([
        'auth',
        EnsureTeamMembership::class,
    ])
    ->group(function () {
        Route::get('dashboard', DashboardController::class)
            ->name('dashboard');
    });

/*
|--------------------------------------------------------------------------
| Rotas dos usuários autenticados
|--------------------------------------------------------------------------
*/
Route::middleware(['auth'])->group(function () {
    // Compatibilidade com links antigos que ainda apontam para /dashboard.
    Route::get('/dashboard', function (\Illuminate\Http\Request $request) {
        $team = $request->user()->currentTeam ?? $request->user()->personalTeam();

        abort_unless($team, 403, 'Nenhuma equipe foi encontrada para este usuário.');

        return redirect()->route('dashboard', ['current_team' => $team->slug]);
    })->name('dashboard.redirect');

    // Convites de equipe
    Route::post('invitations/{invitation}/accept', [
        TeamInvitationController::class,
        'accept',
    ])->name('invitations.accept');

    Route::delete('invitations/{invitation}', [
        TeamInvitationController::class,
        'decline',
    ])->name('invitations.decline');

    // Registro de sentimentos
    Route::get('/sentimentos', [
        SentimentoController::class,
        'index',
    ])->name('sentimentos.index');

    Route::post('/sentimentos', [
        SentimentoController::class,
        'store',
    ])->name('sentimentos.store');

    // Solicitação de ajuda
    Route::get('/solicitar-ajuda', [
        PedidoAjudaController::class,
        'index',
    ])->name('solicitar-ajuda.index');

    Route::post('/solicitar-ajuda', [
        PedidoAjudaController::class,
        'store',
    ])->name('solicitar-ajuda.store');

    Route::post('/solicitar-ajuda/marcar-respostas-lidas', [
        PedidoAjudaController::class,
        'marcarRespostasLidas',
    ])->name('solicitar-ajuda.marcar-respostas-lidas');

    // Histórico emocional
    Route::get('/historico-emocional', function () {
        $sentimentos = \App\Models\Sentimento::where(
            'user_id',
            auth()->id()
        )->latest()->get();

        return Inertia::render('historico-emocional', [
            'sentimentos' => $sentimentos,
        ]);
    })->name('historico.index');

    // Biblioteca de conteúdos de bem-estar
    Route::get('/conteudos', [
        ConteudoBemEstarController::class,
        'index',
    ])->name('conteudos.index');

    // Detalhes de um conteúdo
    Route::get('/conteudos/{conteudo}', [
        ConteudoBemEstarController::class,
        'show',
    ])->name('conteudos.show');

    // Marcar conteúdo como concluído
    Route::post('/conteudos/{conteudo}/concluir', [
        ConteudoBemEstarController::class,
        'concluir',
    ])->name('conteudos.concluir');

    // Chat do D.A.V.I.
    Route::get('/davi-chat', [
        DaviChatController::class,
        'index',
    ])->name('davi.chat.index');

    Route::post('/davi-chat', [
        DaviChatController::class,
        'criar',
    ])->name('davi.chat.criar');

    Route::get('/davi-chat/{conversa}', [
        DaviChatController::class,
        'show',
    ])->name('davi.chat.show');

    Route::delete('/davi-chat/{conversa}', [
        DaviChatController::class,
        'excluir',
    ])->name('davi.chat.excluir');

    Route::post('/davi-chat/{conversa}/mensagens', [
        DaviChatController::class,
        'enviar',
    ])->name('davi.chat.enviar');
});

require __DIR__.'/settings.php';
