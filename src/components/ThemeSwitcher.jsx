import { useState, useEffect } from 'react'
import styles from './ThemeSwitcher.module.css'

import { XMarkIcon, SunIcon, MoonIcon, SwatchIcon } from '@heroicons/react/24/outline';
import UseLocalStorage from '../hooks/UseLocalStorage';

export const ThemeSwitcher = () => {
    const [isColorPicking, setIsColorPicking] = UseLocalStorage('react-todo.isColorPicking', false);
    const [theme, setTheme] = UseLocalStorage("react-todo.theme", "light");
    const [hue, setHue] = UseLocalStorage("react-todo.hue", 240);

    useEffect(()=>{
        document.documentElement.setAttribute('color-scheme', theme)
    }, [theme]);

    useEffect(()=>{
        document.documentElement.style.setProperty('--_hue', hue);
    },[hue]);

  return (
    <aside className={styles.wrapper}
        style={{
            backgroundColor: isColorPicking 
            ? 'hsl(var(--muted) / .6)'
            : 'transparent'
        }}
    >
        {
            isColorPicking ?(
                <>
                    <button 
                        className={`btn ${styles.close}`}
                        onClick={() => setIsColorPicking(false)}
                    > 
                        <XMarkIcon />
                    </button>
                    <input 
                        className={styles.picker}
                        type="range" 
                        min={0} max={360}
                        onInput={(e) => setHue(e.target.value)}
                    />
                </>
            ) : (
                <div className={styles.btns}>
                    <button 
                        className='btn'
                        onClick={() => setTheme(theme==="light" ? "dark" : "light")}
                    >
                        { theme==="light" ? <MoonIcon /> : <SunIcon /> }
                    </button>
                    <button 
                        className='btn'
                        onClick={()=> setIsColorPicking(true)}
                    >
                        <SwatchIcon />
                    </button>
                </div>
            )

        }
    </aside>
  )
}

export default ThemeSwitcher