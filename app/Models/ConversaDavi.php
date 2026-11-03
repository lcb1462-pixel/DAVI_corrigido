<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ConversaDavi extends Model
{
    protected $table = 'conversa_davis';

    protected $fillable = [
        'user_id',
        'titulo',
    ];

    public function usuario(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function mensagens(): HasMany
    {
        return $this->hasMany(MensagemDavi::class, 'conversa_davi_id');
    }
}
