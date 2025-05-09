'use client';
import { useTheme } from 'next-themes';
import { BiMoon, BiSun } from 'react-icons/bi';

const ThemeSwitcher = () => {
    const { theme, setTheme } = useTheme();

    return (
        <div className="flex items-center justify-center mx-2">
            {theme === "light" ? (
                <span
                    className="cursor-pointer"
                    onClick={() => setTheme('dark')}
                >
                    <BiMoon size={25} style={{ color: 'black' }} />
                </span>
            ) : (
                <span
                    className="cursor-pointer"
                    onClick={() => setTheme('light')}
                >
                    <BiSun size={25} style={{ color: 'white' }} />
                </span>
            )}
        </div>
    );
};

export default ThemeSwitcher;
