<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class CategoriaConteudo extends Model
{
    protected $table = 'categorias_conteudo';

    protected $fillable = [
        'nome',
        'descricao',
    ];

    public function conteudos(): HasMany
    {
        return $this->hasMany(
            ConteudoBemEstar::class,
            'categoria_conteudo_id'
        );
    }
}
