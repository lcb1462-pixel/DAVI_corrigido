<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ConteudoBemEstar extends Model
{
    protected $table = 'conteudos_bem_estar';

    protected $fillable = [
        'categoria_conteudo_id',
        'titulo',
        'resumo',
        'conteudo',
        'imagem_url',
        'tempo_leitura',
        'ativo',
    ];

    protected function casts(): array
    {
        return [
            'ativo' => 'boolean',
            'tempo_leitura' => 'integer',
        ];
    }

    public function categoria(): BelongsTo
    {
        return $this->belongsTo(
            CategoriaConteudo::class,
            'categoria_conteudo_id'
        );
    }

    public function atividades(): HasMany
    {
        return $this->hasMany(
            AtividadeConteudo::class,
            'conteudo_bem_estar_id'
        )->orderBy('ordem');
    }

    public function progressos(): HasMany
    {
        return $this->hasMany(
            ProgressoConteudo::class,
            'conteudo_bem_estar_id'
        );
    }
}
