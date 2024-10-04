import { useRef } from 'react';

const CameraComponent = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error('Error accessing the camera:', error);
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      context.drawImage(
        videoRef.current,
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );

      // Stop the video stream after capturing the photo
      const stream = videoRef.current.srcObject;
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());

      // Save the captured image to sessionStorage
      uploadToSessionStorage();
    }
  };

  const uploadToSessionStorage = () => {
    if (canvasRef.current) {
      // Get the image data from the canvas as a base64 string
      const imageData = canvasRef.current.toDataURL('image/png');
      try {
        // Store the image data in sessionStorage
        sessionStorage.setItem('capturedImage', imageData);
        console.log('Image saved to sessionStorage');
      } catch (error) {
        console.error('Error saving to sessionStorage:', error);
      }
    }
  };

  return (
    <div>
      <h1>Take a Picture</h1>
      <video ref={videoRef} autoPlay style={{ display: 'none' }}></video>
      <button onClick={startCamera}>Open Camera</button>
      <button onClick={capturePhoto}>Take Picture</button>
      <canvas
        ref={canvasRef}
        width="640"
        height="480"
        style={{ border: '1px solid black' }}
      ></canvas>
    </div>
  );
};

export default CameraComponent;
