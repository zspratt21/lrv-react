import React, {useState, useEffect, FormEventHandler} from 'react';
import axios from "axios";
import Url from "@/Pages/QrCode/Types/Url";
import Text from "@/Pages/QrCode/Types/Text";
import Email from "@/Pages/QrCode/Types/Email";
import Contact from "@/Pages/QrCode/Types/Contact";
import WIFI from "@/Pages/QrCode/Types/WIFI";
import Modal from "@/Components/Modal";
import loadingSpinner from "@/Components/LoadingSpinner";
const QrCodeCreate = () => {
    useEffect(() => {
        getQrCode('');
        setForm(<Url onSubmit={submit}/>);
    }, []);

    const [qrCode, setQrCode] = useState('');
    const [form, setForm] = useState<React.ReactNode | null>(null);
    const [queryString, setQueryString] = useState('');
    const getQrCode = (data: string) => {
        axios.get('/qrcode/render/google.com'+data)
            .then(function (response) {
                if (data.includes('format=svg')) {
                    downloadQrCode(response.data.qrcode, 'svg');
                }
                else {
                    setQrCode(response.data.qrcode);
                    setQrDisplay(<img src={response.data.qrcode}/>);
                }
            })
            .catch(function (error) {
                console.log(error);
                setErrorMessage(error);
                openErrorModal();
            })
            .finally(function () {});
    }

    const downloadQrCode = (data = qrCode, format = 'png') => {
        let link = document.createElement('a');
        link.href = data;
        link.download = 'qrcode.'+format;
        link.click();
    }

    const downloadQrCodeSvg = () => {
        let tempQueryString = queryString !== '' ? queryString+'&format=svg' : 'format=svg';
        getQrCode('?'+tempQueryString);
    }

    const submit: FormEventHandler = (e ) => {
        e.preventDefault();
        let formData = new FormData(e.currentTarget as HTMLFormElement);
        let tempQueryString = new URLSearchParams(formData as any).toString();
        setQueryString(tempQueryString);
        setQrDisplay(loading);
        getQrCode('?'+tempQueryString);
    };

    const changeForm = (e: React.MouseEvent<HTMLAnchorElement>, formComponent: React.ReactNode) => {
        e.preventDefault();
        setForm(formComponent);
    }

    const [isQrModalOpen, setQrModalOpen] = useState(false);

    const openQrModal = () => {
        setQrModalOpen(true);
    };

    const closeQrModal = () => {
        setQrModalOpen(false);
    };

    const [isErrorModalOpen, setErrorModalOpen] = useState(false);

    const openErrorModal = () => {
        setErrorModalOpen(true);
    };

    const closeErrorModal = () => {
        setErrorModalOpen(false);
    };

    const [errorMessage, setErrorMessage] = useState('There was a problem with the request');

    // @todo highlight qr code type when selected
    // @completed form validation
    // @todo tests for qr request
    // @todo mobile & tablet views/responsiveness
    // @todo page restructure & cleanup

    const loading = loadingSpinner();

    const [qrDisplay, setQrDisplay] = useState(loading);

    return (
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <Modal show={isQrModalOpen} onClose={closeQrModal}>
                <img src={qrCode} className="h-screen max-h-[990px]"/>
            </Modal>
            <Modal show={isErrorModalOpen} onClose={closeErrorModal}>
                <div className="mx-auto p-4">
                    <b className="mb-2 text-red-600">Error</b>
                    <p className="text-gray-900 dark:text-gray-100">{errorMessage}</p>
                </div>
            </Modal>
            <div className="overflow-hidden shadow-sm sm:rounded-lg flex border-2 border-gray-300 dark:border-gray-700">
                <div className="p-6 text-gray-900 dark:text-gray-100 flex-1 border-r-2 border-gray-300 dark:border-gray-700">
                    <div className="flex border border-gray-300 dark:border-gray-700">
                        <a href="" onClick={(e) => changeForm(e, <Url onSubmit={submit}/>)} className="button-primary w-full p-2 text-center selected selected:bg-green-300 selected:dark:bg-green-700 bg-white dark:bg-gray-800"><i className="fa-solid fa-chain"></i> Link</a>
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
                    <a className="w-full" href="" onClick={(e) => {e.preventDefault(); openQrModal()}}>
                        {qrDisplay}
                    </a>
                    <div className="flex">
                        <a href="" onClick={(e) => {e.preventDefault(); downloadQrCode()}} className="button-primary w-full p-2 text-center sm:rounded bg-amber-300 dark:bg-amber-700 ml-4 mr-4"><i className="fa-solid fa-download"></i> PNG</a>
                        <a href="" onClick={(e) => {e.preventDefault(); downloadQrCodeSvg()}} className="button-primary w-full p-2 text-center sm:rounded bg-amber-300 dark:bg-amber-700 ml-4 mr-4"><i className="fa-solid fa-download"></i> SVG</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QrCodeCreate;
