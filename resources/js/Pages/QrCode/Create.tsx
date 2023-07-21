import React, {useState, useEffect, FormEventHandler} from 'react';
import axios from "axios";
import Url from "@/Pages/QrCode/Types/Url";
import Text from "@/Pages/QrCode/Types/Text";
import Email from "@/Pages/QrCode/Types/Email";
import Contact from "@/Pages/QrCode/Types/Contact";
import WIFI from "@/Pages/QrCode/Types/WIFI";
import Modal from "@/Components/Modal";
const QrCodeCreate = () => {
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

    useEffect(() => {
        getQrCode('');
        setForm(<Url onSubmit={submit}/>);
    }, []);

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

    const loading =
    <div className="min-h-[356px]">
        <svg aria-hidden="true"
         className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600 sm:m-auto"
         viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"/>
          <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"/>
        </svg>
    </div>;

    const [qrDisplay, setQrDisplay] = useState(loading);

    return (
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <Modal show={isQrModalOpen} onClose={closeQrModal}>
                {qrDisplay}
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
