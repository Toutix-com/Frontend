import React, { useState } from 'react';
import QrReader from 'react-qr-scanner';
import { privateAxiosInstance } from '../../utils/axiosConfig';
import { showToastError, showToastSuccess } from '../../utils/toast';

const QRScanner = () => {
  const delay = 1000;
  const [result, setResult] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [error, setError] = useState(null);
  const [scanning, setScanning] = useState(false);

  const handleScan = async (scannedData) => {
    console.log(scannedData);
    if (scannedData) {
      setResult(scannedData);
      setScanning(false); // Stop the scanner
      try {
        const { data } = await privateAxiosInstance.post(
          `/validater/${scannedData.ticket_id}/ticket_info`
        );
        console.log(data);

        // Assuming the API returns a field `isValid`
        setIsValid(data.isValid);
        setError(null); // Clear any previous errors
        showToastSuccess('QR Code is valid!'); // Show success popup
      } catch (error) {
        if (
          error.response &&
          error.response.status &&
          error.response.status === 400
        ) {
          // Redirect to login page
          setError('Invalid QR code');
        }
        setError('Error validating QR code: ' + error.message);
        setIsValid(false);
        showToastError('Error validating QR code: ' + error.message); // Show error popup
      } finally {
        // Reset for next scan
        setResult('');
        setScanning(true);
      }
    }
  };

  const handleError = (err) => {
    console.error(err);
    setError('Error accessing the camera: ' + err.message);
  };

  const startScanning = () => {
    setScanning(true);
    setResult(''); // Clear the previous result
    setError(null); // Clear any previous errors
  };

  const previewStyle = {
    height: 250,
    width: 250
  };

  return (
    <div>
      <button onClick={startScanning}>Open QR Scanner</button>
      {scanning && (
        <QrReader
          delay={delay}
          style={previewStyle}
          onError={handleError}
          onScan={handleScan}
        />
      )}
      {/* <p>Result: {result || 'No result'}</p> */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {result && result !== 'No result' && (
        <p>QR Code is {isValid ? 'Valid' : 'Invalid'}</p>
      )}
    </div>
  );
};

export default QRScanner;
