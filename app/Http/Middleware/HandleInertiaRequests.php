<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $user = $request->user();

        return [
            ...parent::share($request),
            'name' => config('app.name'),

            'auth' => [
                'user' => $user,
            ],

            'isAdmin' => (bool) ($user?->is_admin ?? false),

            'sidebarOpen' => ! $request->hasCookie('sidebar_state')
                || $request->cookie('sidebar_state') === 'true',

            'currentTeam' => fn () => $user?->currentTeam
                ? $user->toUserTeam($user->currentTeam)
                : null,

            'teams' => fn () => $user?->toUserTeams(includeCurrent: true) ?? [],
        ];
    }
}
