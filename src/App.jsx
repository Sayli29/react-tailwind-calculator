import { useState } from 'react';
import './Constants/AppLevelConstants';
import AppLevelConstants from './Constants/AppLevelConstants';
import LightMode from './components/icons/LightMode';
import { useEffect } from 'react';
import DarkMode from './components/icons/DarkMode';

function App() {

  const [isDarkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });
  const [currentInput, setCurrentInput] = useState('');
  const [previousInput, setPreviousInput] = useState('');
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState(null);
  const [operation, setOperation] = useState(null);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleMode = () => {
    setDarkMode(!isDarkMode);
  };

  const handleNumberClick = (value) => {
    setCurrentInput(currentInput + value);
    setExpression(expression + value);
  }

  const handleOperationClick = (value) => {
    if (currentInput === '') return;
    if (previousInput !== '') {
      let value = compute();
      setPreviousInput(value);
      setExpression(value + ' ' + value + ' ');
    } else {
      setPreviousInput(currentInput);
      setExpression(expression + ' ' + value + ' ');
    }
    setCurrentInput('');
    setOperation(value);
  }

  const compute = () => {
    let result;
    const prevous = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    if (isNaN(prevous) || isNaN(current)) return '';
    switch (operation) {
      case '+':
        result = prevous + current;
        break;
      case '-':
        result = prevous - current;
        break;
      case 'x':
        result = prevous * current;
        break;
      case '÷':
        result = prevous / current;
        break;
      case '%':
        result = prevous % current;
        break;
      default:
        return;
    }
    return result;
  };

  const handleEqualClick = () => {
    let value = compute();
    if (value === undefined) return;
    setPreviousInput(value);
    setCurrentInput('');
    setOperation(null);
    setExpression(expression + ' =');
    setResult(value);
  };

  const handleClearClick = () => {
    setPreviousInput('');
    setCurrentInput('');
    setOperation(null);
    setExpression('');
    setResult(null);
  }

  return (
    <>
      <div className="flex flex-col justify-center items-center gap-12 w-screen h-screen bg-slate-100 px-80 py-16 max-md:p-0 max-xl:px-40">
        <h1 className='text-slate-700 font-mono text-4xl max-md:hidden'>{AppLevelConstants.CALCULATOR_HEADING}</h1>
        <div className='flex flex-col text-black bg-white w-full h-full rounded dark:text-white dark:bg-slate-900'>
          <div className='w-full h-1/4 p-8 flex flex-col justify-end items-end'>
            <div className="text-2xl">
              {expression}
            </div>
            <div className="text-4xl">
              {result !== null ? result : currentInput || '0'}
            </div>
          </div>
          <div className='grid grid-cols-4 gap-2 w-full h-full bg-slate-50 rounded-t-2xl p-8 dark:text-white dark:bg-slate-800 max-[375px]:gap-y-8 gap-x-4'>
            <button className="btn btn-operation" onClick={toggleMode}>
              {isDarkMode ? <DarkMode></DarkMode> : <LightMode></LightMode>}
            </button>
            <button className="btn btn-operation" onClick={() => handleOperationClick('%')}>%</button>
            <button className="btn btn-operation" onClick={() => handleOperationClick('÷')}>÷</button>
            <button className="btn btn-operation" onClick={() => handleOperationClick('x')}>x</button>

            <button className="btn btn-number" onClick={() => handleNumberClick('7')}>7</button>
            <button className="btn btn-number" onClick={() => handleNumberClick('8')}>8</button>
            <button className="btn btn-number" onClick={() => handleNumberClick('9')}>9</button>
            <button className="btn btn-operation" onClick={() => handleOperationClick('-')}>-</button>

            <button className="btn btn-number" onClick={() => handleNumberClick('4')}>4</button>
            <button className="btn btn-number" onClick={() => handleNumberClick('5')}>5</button>
            <button className="btn btn-number" onClick={() => handleNumberClick('6')}>6</button>
            <button className="btn btn-operation" onClick={() => handleOperationClick('+')}>+</button>

            <button className="btn btn-number" onClick={() => handleNumberClick('1')}>1</button>
            <button className="btn btn-number" onClick={() => handleNumberClick('2')}>2</button>
            <button className="btn btn-number" onClick={() => handleNumberClick('3')}>3</button>
            <button className="btn btn-equal row-span-2" onClick={() => handleEqualClick()}>=</button>

            <button className="btn btn-clear" onClick={() => handleClearClick()}>AC</button>
            <button className="btn btn-number" onClick={() => handleNumberClick('0')}>0</button>
            <button className="btn btn-number" onClick={() => handleNumberClick('.')}>.</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
