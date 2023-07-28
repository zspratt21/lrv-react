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

            $defaultQrCode = $browser->element('#qr-code')->getAttribute('src');
            $browser->screenshot('default qr code');

            $browser
                ->assertSee('Link')
                ->waitForText('Url')
                ->type('url', 'https://www.laravel.com')
                ->press('[type="submit"]')
                ->waitFor('#qr-code')
                ->screenshot('submit url');

            $urlQrCode = $browser->element('#qr-code')->getAttribute('src');
            $this->assertNotEquals($defaultQrCode, $urlQrCode);

            $browser
                ->clickLink('Text')
                ->waitForText('Text')
                ->type('text', 'Hello World')
                ->press('[type="submit"]')
                ->waitFor('#qr-code')
                ->screenshot('submit text');

            $textQrCode = $browser->element('#qr-code')->getAttribute('src');
            $this->assertNotEquals($urlQrCode, $textQrCode);

            $browser
                ->clickLink('Email')
                ->waitForText('Subject')
                ->type('email', 'hello@world.com')
                ->type('subject', 'Hello World')
                ->type('body', 'Hello World')
                ->press('[type="submit"]')
                ->waitFor('#qr-code')
                ->screenshot('submit email');

            $emailQrCode = $browser->element('#qr-code')->getAttribute('src');
            $this->assertNotEquals($textQrCode, $emailQrCode);

            $browser
                ->clickLink('Contact')
                ->waitForText('Name')
                ->type('name', 'John Doe')
                ->type('mobile', '1234567890')
                ->type('email', 'john@doe.com')
                ->type('website', 'https://www.johndoe.com')
                ->type('company', 'John Doe Inc.')
                ->press('[type="submit"]')
                ->waitFor('#qr-code')
                ->screenshot('submit contact');

            $contactQrCode = $browser->element('#qr-code')->getAttribute('src');
            $this->assertNotEquals($emailQrCode, $contactQrCode);

            $browser
                ->clickLink('WI-FI')
                ->waitForText('SSID')
                ->type('ssid', 'My Wifi')
                ->type('password', 'password')
                ->select('network_type', 'WPA')
                ->press('[type="submit"]')
                ->waitFor('#qr-code')
                ->screenshot('submit wifi');

            $wifiQrCode = $browser->element('#qr-code')->getAttribute('src');
            $this->assertNotEquals($contactQrCode, $wifiQrCode);
        });
    }
}
