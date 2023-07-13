import {useState, useEffect, ButtonHTMLAttributes} from 'react';

const DarkModeToggle = (props: ButtonHTMLAttributes<HTMLButtonElement>) => {
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
        <button
            onClick={toggleDarkMode}
            type="button"
            className={`theme-toggle ${props.className}`}
            {...props}
        >
            {isDarkMode ? (
               <span><i id="theme-toggle-dark-icon" className="fa-regular fa-moon"></i> Dark</span>
            ) : (
                <span><i id="theme-toggle-light-icon" className="fa-regular fa-sun"></i> Light</span>
            )}
        </button>
    );
};

export default DarkModeToggle;
