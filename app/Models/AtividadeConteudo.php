<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class AtividadeConteudo extends Model
{
    protected $table = 'atividades_conteudo';

    protected $fillable = [
        'conteudo_bem_estar_id',
        'titulo',
        'instrucao',
        'tipo',
        'ordem',
    ];

    public function conteudo(): BelongsTo
    {
        return $this->belongsTo(
            ConteudoBemEstar::class,
            'conteudo_bem_estar_id'
        );
    }
}
