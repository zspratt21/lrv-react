<?php

namespace App\Http\Controllers;

use chillerlan\QRCode\QRCode;
use chillerlan\QRCode\QROptions;
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
        $type = $request->get('type', 'png');
        $qrOptions = [
            'scale' => 20,
            'imageBase64' => true,
        ];
        $qrOptions['outputType'] = $type == 'svg' ? QRCode::OUTPUT_MARKUP_SVG : QRCode::OUTPUT_IMAGE_PNG;
        $qrOptions['eccLevel'] = $type == 'svg' ? QRCode::ECC_L : QRCode::ECC_H;

        $options = new QROptions($qrOptions);

        $qrCode = (new QRCode($options))->render('https://www.google.com');
            return response()->json([
            'qrcode' => $qrCode,
            'options' => json_encode($options),
        ]);
    }
}
