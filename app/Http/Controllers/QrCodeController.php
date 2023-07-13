<?php

namespace App\Http\Controllers;

use chillerlan\QRCode\QRCode;
use Illuminate\Http\Request;

class QrCodeController extends Controller
{
    /**
     * JSON Callback - Render a QR code
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function renderQrCode(Request $request)
    {
        $qrCode = (new QRCode)->render('www.google.com');
        return response()->json(['qrcode' => $qrCode]);
    }
}
