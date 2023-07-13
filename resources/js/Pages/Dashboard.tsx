import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import axios from "axios";
import {useEffect, useState} from "react";

export default function Dashboard({ auth }: PageProps) {
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
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">You're logged in! <i className="fa-regular fa-smile-beam"></i> </div>
                    </div>
                </div>
            </div>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100"><img src={qrCode}/></div>
                    </div>
                </div>
            </div>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            the form here
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
