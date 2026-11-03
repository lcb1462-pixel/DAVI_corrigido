<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Sentimento extends Model
{
    protected $fillable = [
        'user_id',
        'sentimento',
        'observacao',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
