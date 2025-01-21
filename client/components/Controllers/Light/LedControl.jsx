import React, { useState, useEffect } from 'react';
import { Power, Loader, WifiOff } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const LedControl = (props) => {
  const [isOn, setIsOn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isConnected, setIsConnected] = useState(true);

  // Replace with your ESP32's IP address
  const ESP32_IP = (props.address !='')? props.address : '192.168.1.100';

  const checkLEDStatus = async () => {
    try {
      const response = await fetch(`http://${ESP32_IP}/led/status`);
      const data = await response.json();
      if (data.status === 'success') {
        setIsOn(data.state === 'on');
        setIsConnected(true);
        setError('');
      }
    } catch (error) {
      setIsConnected(false);
      setError('Cannot connect to LED controller');
    }
  };

  useEffect(() => {
    checkLEDStatus();
    // Poll status every 5 seconds
    const interval = setInterval(checkLEDStatus, 5000);
    return () => clearInterval(interval);
  }, []);

  const toggleLED = async () => {
    setIsLoading(true);
    setError('');
    try {
      const response = await fetch(`http://${ESP32_IP}/led/${isOn ? 'off' : 'on'}`);
      const data = await response.json();
      if (data.status === 'success') {
        setIsOn(data.state === 'on');
        setIsConnected(true);
      } else {
        setError('Failed to control LED');
      }
    } catch (error) {
      setIsConnected(false);
      setError('Error connecting to LED controller');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg space-y-6 w-full max-w-md">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">LED Control Panel</h1>
          <div className="flex items-center justify-center gap-2">
            {isConnected ? (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                Connected
              </span>
            ) : (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                <WifiOff className="w-4 h-4 mr-1" />
                Disconnected
              </span>
            )}
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Main Control Button */}
        <div className="flex justify-center">
          <button
            onClick={toggleLED}
            disabled={isLoading || !isConnected}
            className={`
              relative p-6 rounded-full transition-all duration-200
              ${isOn 
                ? 'bg-green-500 hover:bg-green-600' 
                : 'bg-gray-300 hover:bg-gray-400'
              }
              disabled:opacity-50 disabled:cursor-not-allowed
              ${!isConnected ? 'bg-gray-400' : ''}
            `}
          >
            {isLoading ? (
              <Loader className="w-8 h-8 text-white animate-spin" />
            ) : (
              <Power className="w-8 h-8 text-white" />
            )}
          </button>
        </div>

        {/* Status Indicator */}
        <div className="flex justify-center items-center space-x-4">
          <div className={`
            w-4 h-4 rounded-full
            ${isOn ? 'bg-green-500' : 'bg-gray-300'}
            ${isLoading ? 'animate-pulse' : ''}
            ${!isConnected ? 'bg-red-500' : ''}
          `} />
          <span className="text-sm text-gray-600">
            {!isConnected 
              ? 'Disconnected' 
              : isLoading 
                ? 'Processing...' 
                : `LED is ${isOn ? 'ON' : 'OFF'}`
            }
          </span>
        </div>

        {/* IP Address Display */}
        <div className="text-center text-sm text-gray-500">
          Controller IP: {ESP32_IP}
        </div>
      </div>
    </div>
  );
};

export default LedControl;