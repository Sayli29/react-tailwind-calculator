import { useState } from 'react';
import './Constants/AppLevelConstants';
import AppLevelConstants from './Constants/AppLevelConstants';
import LightMode from './components/icons/LightMode';
import { useEffect } from 'react';
import DarkMode from './components/icons/DarkMode';

function App() {

  const [isDarkMode, setDarkMode] = useState(()=> {
    return localStorage.getItem('theme') === 'dark';
  })

  useEffect(() => {
      if(isDarkMode){
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
    }, [isDarkMode]);

   const toggleMode = () => {
      setDarkMode(!isDarkMode);
   }

  return (
    <>
      <div className="flex flex-col justify-center items-center gap-12 w-screen h-screen bg-slate-100 px-80 py-16 max-sm:p-0">
        <h1 className='text-slate-700 font-mono text-4xl max-sm:hidden'>{AppLevelConstants.CALCULATOR_HEADING}</h1>
        <div className='flex flex-col gap-4 text-black bg-white w-full h-full rounded dark:text-white dark:bg-slate-900'>
          <div className='w-full h-1/4 p-8'>Input</div>
          <div className='grid grid-cols-4 gap-2 w-full h-full bg-slate-50 rounded-t-2xl p-8 dark:text-white dark:bg-slate-800 max-sm:gap-y-8 gap-x-4'>
          <button className="btn btn-operation" onClick={toggleMode}>
            { isDarkMode ? <DarkMode></DarkMode> :<LightMode></LightMode>}
          </button>
          <button className="btn btn-operation">%</button>
          <button className="btn btn-operation">÷</button>
          <button className="btn btn-operation">x</button>

          <button className="btn btn-number">7</button>
          <button className="btn btn-number">8</button>
          <button className="btn btn-number">9</button>
          <button className="btn btn-operation">-</button>

          <button className="btn btn-number">4</button>
          <button className="btn btn-number">5</button>
          <button className="btn btn-number">6</button>
          <button className="btn btn-operation">+</button>

          <button className="btn btn-number">1</button>
          <button className="btn btn-number">2</button>
          <button className="btn btn-number">3</button>
          <button className="btn btn-equal row-span-2">=</button>

          <button className="btn btn-clear">AC</button>
          <button className="btn btn-number">0</button>
          <button className="btn btn-number">.</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
