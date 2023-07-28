<?php

namespace Tests\Browser\QrCode;

use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Laravel\Dusk\Browser;
use Tests\DuskTestCase;

class CreateTest extends DuskTestCase
{
    use DatabaseMigrations;

    /**
     * A Dusk test example.
     */
    public function testExample(): void
    {
        // create new user
        $user = User::factory()->create();

        $this->browse(function (Browser $browser) use ($user) {
            $browser
                ->visit('/')
                ->assertSee('Laravel')
                ->assertSee('Log in')
                ->clickLink('Log in')
                ->waitForText('Email')
                ->assertSee('Email')
                ->assertPathIs('/login')
                ->type('email', $user->email)
                ->type('password', 'password')
                ->press('[value="login"]')
                ->waitForText('Dashboard')
                ->assertPathIs('/dashboard')
                ->assertSee($user->name);

            $defaultQrCode = $browser->element('img#qr-code')->getAttribute('src');

            $browser
                ->assertSee('Link')
                ->type('url', 'https://www.google.com')
                ->press('[type="submit"]')
                ->assertValueIsNot($browser->element('img#qr-code')->getAttribute('src'), $defaultQrCode);
        });
    }
}
