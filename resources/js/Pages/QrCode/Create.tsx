import {useState, useEffect} from 'react';
import axios from "axios";
const QrCodeCreate = () => {
    const [qrCode, setQrCode] = useState('');

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
    }, []);

    return (
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow-sm sm:rounded-lg flex border-2">
                <div className="p-6 text-gray-900 dark:text-gray-100 flex-1 border-r-2">form</div>
                <div className="p-6 text-gray-900 dark:text-gray-100 w-1/3 bg-white dark:bg-gray-800 ">
                    <img className="w-full" src={qrCode}/>
                    <div className="flex">
                        <a href="" className="button-primary w-full p-2 text-center sm:rounded bg-gray-100 dark:bg-gray-900 ml-4 mr-4"><i className="fa-solid fa-download"></i> PNG</a>
                        <a href="" className="button-primary w-full p-2 text-center sm:rounded bg-gray-100 dark:bg-gray-900 ml-4 mr-4"><i className="fa-solid fa-download"></i> SVG</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QrCodeCreate;
