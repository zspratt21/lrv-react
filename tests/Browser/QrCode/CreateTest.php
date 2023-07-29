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
     * Use browser actions to log in.
     */
    public function login($user, $browser): void
    {
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
    }

    /**
     * Test creating different types of QR codes.
     */
    public function testFormTypes(): void
    {
        $user = User::factory()->create();

        $this->browse(function (Browser $browser) use ($user) {
            $this->login($user, $browser);

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

    /**
     * Test error handling of the forms.
     */
    public function testFormTypesErrorHandling()
    {
        $user = User::factory()->create();

        $this->browse(function (Browser $browser) use ($user) {
            $browser
                ->clickLink('Dashboard')
                ->waitForText($user->name)
                ->screenshot('Error Handling - dashboard')
                ->assertPathIs('/dashboard');

            $defaultQrCode = $browser->element('#qr-code')->getAttribute('src');

            $browser
                ->type('url', 'this is not a url')
                ->press('[type="submit"]')
                ->waitForText('Please enter a valid url')
                ->screenshot('Error Handling - url');

            $invalidUrlQrCode = $browser->element('#qr-code')->getAttribute('src');
            $this->assertEquals($defaultQrCode, $invalidUrlQrCode);

            $browser
                ->clickLink('Text')
                ->waitForText('Text')
                ->type('text', '')
                ->press('[type="submit"]')
                ->waitForText('Please enter some text')
                ->screenshot('Error Handling - text');

            $invalidTextQrCode = $browser->element('#qr-code')->getAttribute('src');
            $this->assertEquals($invalidUrlQrCode, $invalidTextQrCode);

            $browser
                ->clickLink('Email')
                ->waitForText('Subject')
                ->type('email', 'this is not an email')
                ->press('[type="submit"]')
                ->waitForText('Please enter a valid email')
                ->assertSee('Please enter a subject')
                ->assertSee('Please enter a body')
                ->screenshot('Error Handling - email');

            $invalidEmailQrCode = $browser->element('#qr-code')->getAttribute('src');
            $this->assertEquals($invalidTextQrCode, $invalidEmailQrCode);

            $browser
                ->clickLink('Contact')
                ->waitForText('Name')
                ->type('name', '')
                ->type('mobile', '')
                ->type('email', 'this is not a valid email')
                ->type('website', 'this is not a valid url')
                ->press('[type="submit"]')
                ->waitForText('Please enter a name')
                ->assertSee('Mobile number cannot be empty')
                ->assertSee('Please enter a valid email')
                ->assertSee('Please enter a valid website url')
                ->screenshot('Error Handling - contact');

            $invalidContactQrCode = $browser->element('#qr-code')->getAttribute('src');
            $this->assertEquals($invalidEmailQrCode, $invalidContactQrCode);

            $browser
                ->type('mobile', 'this is not a valid mobile number')
                ->press('[type="submit"]')
                ->waitForText('Please enter a valid mobile number')
                ->screenshot('Error Handling - contact invalid mobile');

            $invalidContactQrCodeMobile = $browser->element('#qr-code')->getAttribute('src');
            $this->assertEquals($invalidContactQrCode, $invalidContactQrCodeMobile);

            $browser
                ->clickLink('WI-FI')
                ->waitForText('SSID')
                ->type('ssid', '')
                ->type('password', '')
                ->press('[type="submit"]')
                ->waitForText('Please enter a SSID')
                ->assertSee('Please enter a password')
                ->screenshot('Error Handling - wifi');

            $invalidWifiQrCode = $browser->element('#qr-code')->getAttribute('src');
            $this->assertEquals($invalidContactQrCodeMobile, $invalidWifiQrCode);

            $browser
                ->type('password', 'topsecret')
                ->select('network_type', 'No Encryption')
                ->press('[type="submit"]')
                ->waitForText('A password is not allowed for this network type')
                ->screenshot('Error Handling - wifi no encryption');

            $invalidWifiQrCodeNoEncryption = $browser->element('#qr-code')->getAttribute('src');
            $this->assertEquals($invalidWifiQrCode, $invalidWifiQrCodeNoEncryption);
        });
    }
}
