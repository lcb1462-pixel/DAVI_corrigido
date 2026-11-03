<?php

namespace App\Http\Controllers;

use App\Models\Sentimento;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class SentimentoController extends Controller
{
    public function index()
    {
        $sentimentos = Sentimento::where('user_id', Auth::id())
            ->latest()
            ->get();

        return Inertia::render('sentimentos', [
            'sentimentos' => $sentimentos,
        ]);
    }

    public function store(Request $request)
    {
        $dados = $request->validate([
            'sentimento' => 'required|in:Feliz,Neutro,Triste,Ansioso',
            'observacao' => 'nullable|string|max:1000',
        ]);

        Sentimento::create([
            'user_id' => Auth::id(),
            'sentimento' => $dados['sentimento'],
            'observacao' => $dados['observacao'] ?? null,
        ]);

        return redirect()->route('sentimentos.index')
            ->with('success', 'Sentimento registrado com sucesso!');
    }
}
