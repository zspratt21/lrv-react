import React, {useState, useEffect, FormEventHandler} from 'react';
import axios from "axios";
import Url from "@/Pages/QrCode/Types/Url";
import Text from "@/Pages/QrCode/Types/Text";
import Email from "@/Pages/QrCode/Types/Email";
import Contact from "@/Pages/QrCode/Types/Contact";
import WIFI from "@/Pages/QrCode/Types/WIFI";
const QrCodeCreate = () => {
    const [qrCode, setQrCode] = useState('');
    const [form, setForm] = useState<React.ReactNode | null>(null);
    const [queryString, setQueryString] = useState('');
    const getQrCode = (data: string) => {
        // @todo set loading animation here.
        axios.get('/qrcode/render/google.com'+data)
            .then(function (response) {
                if (response.data.format == 'svg') {
                    downloadQrCode(null, response.data.qrcode, 'svg');
                }
                else {
                    setQrCode(response.data.qrcode);
                }
            })
            .catch(function (error) {
                // @todo consider adding popup to user (generic or specific) with fancy react animation.
                console.log(error);
            })
            .finally(function () {});
    }

    const downloadQrCode = (e: React.MouseEvent<HTMLAnchorElement> | null, data = qrCode, format = 'png') => {
        if (e !== null) {
            e.preventDefault();
        }
        let link = document.createElement('a');
        link.href = data;
        link.download = 'qrcode.'+format;
        link.click();
    }

    const downloadQrCodeSvg = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        getQrCode('?'+queryString+'&format=svg');
    }

    useEffect(() => {
        getQrCode('');
        setForm(<Url onSubmit={submit}/>);
    }, []);

    const submit: FormEventHandler = (e ) => {
        e.preventDefault();
        let formData = new FormData(e.currentTarget as HTMLFormElement);
        let tempQueryString = new URLSearchParams(formData as any).toString();
        setQueryString(tempQueryString);
        getQrCode('?'+tempQueryString);
    };

    const changeForm = (e: React.MouseEvent<HTMLAnchorElement>, formComponent: React.ReactNode) => {
        e.preventDefault();
        setForm(formComponent);
    }

    return (
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow-sm sm:rounded-lg flex border-2 border-gray-300 dark:border-gray-700">
                <div className="p-6 text-gray-900 dark:text-gray-100 flex-1 border-r-2 border-gray-300 dark:border-gray-700">
                    <div className="flex border border-gray-300 dark:border-gray-700">
                        <a href="" onClick={(e) => changeForm(e, <Url onSubmit={submit}/>)} className="button-primary w-full p-2 text-center bg-white dark:bg-gray-800"><i className="fa-solid fa-chain"></i> Link</a>
                        <a href="" onClick={(e) => changeForm(e, <Text onSubmit={submit}/>)} className="button-primary w-full p-2 text-center bg-white dark:bg-gray-800"><i className="fa-solid fa-align-justify"></i> Text</a>
                        <a href="" onClick={(e) => changeForm(e, <Contact onSubmit={submit}/>)} className="button-primary w-full p-2 text-center bg-white dark:bg-gray-800"><i className="fa-solid fa-contact-card"></i> Contact</a>
                        <a href="" onClick={(e) => changeForm(e, <Email onSubmit={submit}/>)} className="button-primary w-full p-2 text-center bg-white dark:bg-gray-800"><i className="fa-solid fa-envelope"></i> Email</a>
                        <a href="" onClick={(e) => changeForm(e, <WIFI onSubmit={submit}/>)} className="button-primary w-full p-2 text-center bg-white dark:bg-gray-800"><i className="fa-solid fa-wifi"></i> WI-FI</a>
                    </div>
                    <div id="qr-form-container" className="border-gray-300 dark:border-gray-700 p-4">
                        {form}
                    </div>
                </div>
                <div className="p-6 text-gray-900 dark:text-gray-100 w-1/3 bg-white dark:bg-gray-800">
                    {/* @todo Add pop up to show qr code fullscreen/maximized */}
                    <a className="w-full" href="" onClick={(e) => {e.preventDefault()}}><img src={qrCode}/></a>
                    <div className="flex">
                        {/* @todo download links functionality */}
                        <a href="" onClick={(e) => {downloadQrCode(e)}} className="button-primary w-full p-2 text-center sm:rounded bg-amber-300 dark:bg-amber-700 ml-4 mr-4"><i className="fa-solid fa-download"></i> PNG</a>
                        <a href="" onClick={(e) => {downloadQrCodeSvg(e)}} className="button-primary w-full p-2 text-center sm:rounded bg-amber-300 dark:bg-amber-700 ml-4 mr-4"><i className="fa-solid fa-download"></i> SVG</a>
                    </div>
                </div>
            </div>
            {/*  @todo Appearance customization  */}
        </div>
    );
};

export default QrCodeCreate;
