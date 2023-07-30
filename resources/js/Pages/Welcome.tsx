import {Link, Head} from '@inertiajs/react';
import {PageProps} from '@/types';
import DarkModeToggle from "@/Components/DarkModeToggle";
import Footer from "@/Components/Footer";
import Header from "@/Components/Header";

export default function Welcome() {
    return (

        //bg-white dark:bg-gray-800
        //bg-gray-100 dark:bg-gray-900
        <div className="lg:h-screen min-h-screen bg-white dark:bg-gray-800">
            <Header user={null}/>
            <div className="bg-white dark:bg-gray-800 w-full overflow-hidden relative">
                <div className="bg-gray-100 dark:bg-gray-900 relative">
                    <section className="pt-4 sm:pt-8">
                        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
                            <div className="mx-auto text-center max-w-2xl">
                                <p className="px-6 text-lg text-gray-500 dark:text-gray-400 font-inter">Welcome to my QRcode Generator!</p>
                                <div className="block mt-0 text-4xl font-bold text-gray-900 dark:text-white font-pj sm:leading-tight sm:text-5xl lg:text-6xl lg:leading-tight">
                                    <p className="mt-2 text-3xl font-bold font-pj sm:leading-tight sm:text-5xl lg:text-6xl lg:leading-tight">Build QR codes from anywhere</p>
                                </div>
                            </div>
                        </div>
                        <div className="mt-8 mb-0 pb-12 bg-white dark:bg-gray-800">
                            <div className="relative">
                                <div className="bg-gray-100 dark:bg-gray-900 absolute inset-0 h-1/2"></div>
                                <div className="mx-auto relative">
                                    <div className="lg:max-w-screen-xl lg:mx-auto">
                                        <img
                                            src="https://images2.imgbox.com/bb/e1/wpFMVRCT_o.png"
                                            className="transform w-[800px] h-auto lg:mx-auto rounded-lg p-3 dark:bg-white bg-gray-900"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
            <Footer/>
        </div>
    );
}
