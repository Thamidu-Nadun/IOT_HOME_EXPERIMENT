import React, { useState } from 'react';
import { Power, Loader } from 'lucide-react';

const LedControl = () => {
  const [isOn, setIsOn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const toggleLED = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`http://${ESP32_IP}/led/${isOn ? 'off' : 'on'}`);
      const data = await response.json();
      if (data.status === 'success') {
        setIsOn(data.state === 'on');
      } else {
        alert('Failed to control LED');
      }
    } catch (error) {
      alert('Error connecting to LED controller');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg space-y-6 w-full max-w-md">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">LED Control Panel</h1>
          <p className="text-gray-600">Current Status: {isOn ? 'ON' : 'OFF'}</p>
        </div>

        <div className="flex justify-center">
          <button
            onClick={toggleLED}
            disabled={isLoading}
            className={`
              relative p-6 rounded-full transition-all duration-200
              ${isOn 
                ? 'bg-green-500 hover:bg-green-600' 
                : 'bg-gray-300 hover:bg-gray-400'
              }
              disabled:opacity-50 disabled:cursor-not-allowed
            `}
          >
            {isLoading ? (
              <Loader className="w-8 h-8 text-white animate-spin" />
            ) : (
              <Power className="w-8 h-8 text-white" />
            )}
          </button>
        </div>

        <div className="flex justify-center items-center space-x-4">
          <div className={`
            w-4 h-4 rounded-full
            ${isOn ? 'bg-green-500' : 'bg-gray-300'}
            ${isLoading ? 'animate-pulse' : ''}
          `} />
          <span className="text-sm text-gray-600">
            {isLoading ? 'Processing...' : 'Ready'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default LedControl;