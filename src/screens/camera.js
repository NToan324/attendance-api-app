import React, { useRef } from "react";
import Webcam from "react-webcam";
import { Button } from "rsuite";

const videoConstraints = {
  width: 540,
  facingMode: "environment",
};

const FACING_MODE_USER = "user";
const FACING_MODE_ENVIRONMENT = "environment";

const Camera = () => {
  const webcamRef = useRef(null);
  const [url, setUrl] = React.useState(null);
  const [change, setChange] = React.useState(true);
  const [facingMode, setFacingMode] = React.useState(FACING_MODE_USER);

  // Switch between front and back camera
  const handleClick = React.useCallback(() => {
    setFacingMode((prevState) =>
      prevState === FACING_MODE_USER ?
        FACING_MODE_ENVIRONMENT
      : FACING_MODE_USER
    );
  }, []);

  // Capture photo from webcam
  const capturePhoto = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setUrl(imageSrc);
    setChange(false);
  }, [webcamRef]);

  // Handle media access
  const onUserMedia = (e) => {
    console.log(e);
  };

  // Handle refresh to retake the photo
  const handleRefresh = () => {
    setUrl(null);
    setChange(true);
  };

  return (
    <>
      {
        change ?
          // Show the webcam if in capture mode
          <Webcam
            ref={webcamRef}
            audio={false}
            screenshotFormat="image/jpeg"
            videoConstraints={{ ...videoConstraints, facingMode }}
            onUserMedia={onUserMedia}
            mirrored={true}
            style={{ width: "250px", height: "250px" }}
          />
          // Show the captured image in preview mode
        : <div className="my-9">
            <img src={url} alt="Screenshot" />
          </div>

      }

      {
        change ?
          // Show capture buttons when in webcam mode
          <>
            <Button color="green" appearance="primary" onClick={capturePhoto}>
              Chụp ngay
            </Button>
            &nbsp;
            <Button color="red" appearance="primary" onClick={handleClick}>
              Đổi camera
            </Button>
          </>
          // Show refresh button when in image preview mode
        : <Button appearance="default" onClick={handleRefresh}>
            Làm mới
          </Button>

      }
    </>
  );
};

export default Camera;
