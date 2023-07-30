export default function Footer() {
    return (
        <footer className="absolute bottom-0 left-0 z-20 w-full">
            <div className="bg-gray-100 dark:bg-gray-900 w-full pt-8 pr-4 pb-8 pl-4 md:px-24 lg:px-8">
                <div className="mr-auto ml-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
                    <div className="flex flex-col justify-between pt-5 pr-0 pb-10 pl-0 border-t border-gray-200 dark:border-gray-800 sm:flex-row text-gray-400 dark:text-gray-500">
                        <p className="text-sm">© Copyright {new Date().getFullYear()} Zspratt21</p>
                        <div className="flex items-center mt-4 space-x-4 sm:mt-0">
                            <i className="fa-twitter h-5 fab transition-colors duration-300 hover:text-teal-accent-400"></i>
                            <i className="fa-instagram h-5 fab transition-colors duration-300 hover:text-teal-accent-400"></i>
                            <i className="fa-facebook h-5 fab transition-colors duration-300 hover:text-teal-accent-400"></i>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
