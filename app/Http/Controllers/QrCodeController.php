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
        switch ($type) {
            case 'url':
            case 'text':
                $data = !empty($query[$type]) ? $query[$type] : 'Hello World!';
                break;
            case 'email':
                $subject = $query['subject'];
                $body = $query['body'];
                $data = 'mailto:' . $query['email'] . '?subject=' . $subject . '&body=' . $body;
                break;
            case 'contact':
                $name = 'FN:' . $query['name'] .  "\n";
                $mobile = 'TEL;TYPE=cell:' . $query['mobile'] . "\n";
                $email = !empty($query['email']) ? 'EMAIL:' . $query['email'] . "\n" : '';
                $website = !empty($query['website']) ? 'URL:' . $query['website'] . "\n" : '';
                $company = !empty($query['company']) ? 'ORG:' . $query['company'] . "\n" : '';
                $data = 'BEGIN:VCARD' . "\n" .
                    'VERSION:3.0' . "\n" .
                    $name .
                    $mobile .
                    $email .
                    $website .
                    $company .
                    'END:VCARD';
                break;
            case 'wifi':
                $data = 'WIFI:T:' . $query['network_type'] . ';S:' . $query['ssid'] . ';P:' . $query['password'] . ';;';
                break;
        }
        $debug['data'] = $data; // @debug
        $format = $query['format'] ?? $query['type'] ?? 'png';
        $qrOptions = [
            'scale' => 20,
            'imageBase64' => true,
        ];
        $qrOptions['outputType'] = $format == 'svg' ? QRCode::OUTPUT_MARKUP_SVG : QRCode::OUTPUT_IMAGE_PNG;

        $options = new QROptions($qrOptions);

        $qrCode = (new QRCode($options))->render($data);
            return response()->json([
                'qrcode' => $qrCode,
                'options' => json_encode($options), // @debug
                'query' => $request->query(), // @debug
                'debug' => $debug, // @debug,
                'format' => $format,
            ]);
    }
}
