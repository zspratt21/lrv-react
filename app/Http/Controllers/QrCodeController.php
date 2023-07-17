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
        $query = $request->query();
        $type = !empty($query['type']) ? $query['type'] : 'text';
        $data = '';
        // @debug
        $debug = [];
        switch ($type)
        {
            case 'url':
            case 'text':
                $data = !empty($query[$type]) ? $query[$type] : 'Hello World!';
                break;
            case 'email':
                // @todo
                $subject = $query['subject'];
                $body = $query['body'];
                $data = 'mailto:' . $query['email'] . '?subject=' . $subject . '&body=' . $body;
                $debug['data'] = $data;
                break;
        }
        $format = $query['format'] ?? $query['type'] ?? 'png';
        $qrOptions = [
            'scale' => 20,
            'imageBase64' => true,
        ];
        $qrOptions['outputType'] = $format == 'svg' ? QRCode::OUTPUT_MARKUP_SVG : QRCode::OUTPUT_IMAGE_PNG;
        $qrOptions['eccLevel'] = $format == 'svg' ? QRCode::ECC_L : QRCode::ECC_H;

        $options = new QROptions($qrOptions);

        $qrCode = (new QRCode($options))->render($data);
            return response()->json([
                'qrcode' => $qrCode,
                'options' => json_encode($options), // @debug
                'query' => $request->query(), // @debug
                'debug' => $debug, // @debug,
            ]);
    }
}
