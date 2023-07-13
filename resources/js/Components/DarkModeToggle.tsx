import { useState, useEffect } from 'react';

const DarkModeToggle = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const toggleDarkMode = () => {
        setIsDarkMode((prevMode) => {
            const newMode = !prevMode;
            localStorage.setItem('color-theme', newMode ? 'dark' : 'light');
            toggleClass();
            return newMode;
        });
    };

    function toggleClass() {
        if (
            localStorage.getItem('color-theme') === 'dark' ||
            (!('color-theme' in localStorage) &&
                window.matchMedia('(prefers-color-scheme: dark)').matches)
        ) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }

    useEffect(() => {
        const storedTheme = localStorage.getItem('color-theme');
        const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setIsDarkMode(storedTheme === 'dark' || (!storedTheme && prefersDarkMode));
        toggleClass();
    }, []);

    return (
        <button id="theme-toggle" onClick={toggleDarkMode} type="button" className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5">
            {isDarkMode ? (
                <i id="theme-toggle-dark-icon" className="fa-regular fa-moon"></i>
            ) : (
                <i id="theme-toggle-light-icon" className="fa-regular fa-sun"></i>
            )}
        </button>
    );
};

export default DarkModeToggle;
