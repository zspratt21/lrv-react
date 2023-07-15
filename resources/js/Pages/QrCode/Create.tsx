import {useState, useEffect, FormEventHandler} from 'react';
import axios from "axios";
import Url from "@/Pages/QrCode/Types/Url";
const QrCodeCreate = () => {
    const [qrCode, setQrCode] = useState('');
    var form: HTMLElement | null;


    useEffect(() => {
        axios.get('/qrcode/render/google.com')
            .then(function (response) {
                console.log(response.data.qrcode);
                setQrCode(response.data.qrcode);
            })
            .catch(function (error) {
                // @todo consider adding popup to user (generic or specific) with fancy react animation.
                console.log(error);
            })
            .finally(function () {});
        form = document.getElementById('qr-code-form');
    }, []);

    // @todo create forms for url, text and contact qr codes.

    return (
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow-sm sm:rounded-lg flex border-2 border-gray-300 dark:border-gray-700">
                <div className="p-6 text-gray-900 dark:text-gray-100 flex-1 border-r-2 border-gray-300 dark:border-gray-700">
                    <div className="flex border border-gray-300 dark:border-gray-700">
                        <a href="" className="button-primary w-full p-2 text-center bg-white dark:bg-gray-800"><i className="fa-solid fa-chain"></i> Link</a>
                        <a href="" className="button-primary w-full p-2 text-center bg-white dark:bg-gray-800"><i className="fa-solid fa-align-justify"></i> Text</a>
                        <a href="" className="button-primary w-full p-2 text-center bg-white dark:bg-gray-800"><i className="fa-solid fa-contact-card"></i> Contact</a>
                        <a href="" className="button-primary w-full p-2 text-center bg-white dark:bg-gray-800"><i className="fa-solid fa-envelope"></i> Email</a>
                        <a href="" className="button-primary w-full p-2 text-center bg-white dark:bg-gray-800"><i className="fa-solid fa-wifi"></i> WI-FI</a>
                    </div>
                    <div className="border-gray-300 dark:border-gray-700 p-4">
                        <Url/>
                    </div>
                </div>
                <div className="p-6 text-gray-900 dark:text-gray-100 w-1/3 bg-white dark:bg-gray-800">
                    <img className="w-full" src={qrCode}/>
                    <div className="flex">
                        <a href="" className="button-primary w-full p-2 text-center sm:rounded bg-amber-300 dark:bg-amber-700 ml-4 mr-4"><i className="fa-solid fa-download"></i> PNG</a>
                        <a href="" className="button-primary w-full p-2 text-center sm:rounded bg-amber-300 dark:bg-amber-700 ml-4 mr-4"><i className="fa-solid fa-download"></i> SVG</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QrCodeCreate;
