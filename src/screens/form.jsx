import React, { useEffect, useState } from "react";
import "rsuite/dist/rsuite.min.css";
import { ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";

import Location from "./location";
import Camera from "./camera";

import { Form, ButtonToolbar, Button } from "rsuite";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { imageDb } from "../components/firebaseImage/config";

export default function FormComponent() {
  const [showCamera, setShowCamera] = useState(false);
  const [cameraPermission, setCameraPermission] = useState(false);
  const [locationPermission, setLocationPermission] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const handleOpen = () => {
    setShowCamera(true);
  };

  const handleUploadImageFirebase = async () => {
    try {
      console.log("upload image to firebase", imageUrl);
      const imgRef = ref(imageDb, `image/${v4()}`);
      await uploadBytes(imgRef, imageUrl);
    } catch (error) {
      throw new Error(error);
    }
  };

  const getUrlImageFromCamera = async (url) => {
    setImageUrl(url);
  };

  useEffect(() => {
    async function checkPermissionCamera() {
      try {
        await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        setCameraPermission(true);
      } catch (error) {
        setCameraPermission(false);
      }
      try {
        const locationPermission = await navigator.permissions.query({
          name: "geolocation",
        });
        if (locationPermission.state === "granted") {
          setLocationPermission(true);
        } else {
          setLocationPermission(false);
        }
      } catch (error) {
        setLocationPermission(false);
      }
    }
    checkPermissionCamera();
  }, []);
  return (
    <div className="bg-white p-10 w-1/2 min-w-96 h-fit">
      <div className="title border-b pb-10 custom-border-color">
        <h3>Điểm danh sinh viên</h3>
        <p className="text-base">
          Các bạn vui lòng cho phép truy cập máy ảnh và vị trí!
        </p>
      </div>
      <Form className="mt-5 text-base flex flex-col gap-5 justify-start content-center">
        <Form.Group controlId="name">
          <Form.ControlLabel>Họ và tên</Form.ControlLabel>
          <Form.Control name="name" />
          <Form.HelpText>Đây là thông tin bắt buộc</Form.HelpText>
        </Form.Group>
        <Form.Group controlId="email">
          <Form.ControlLabel>Mã số sinh viên</Form.ControlLabel>
          <Form.Control name="email" type="email" />
          <Form.HelpText tooltip>Đây là thông tin bắt buộc</Form.HelpText>
        </Form.Group>
        <Form.Group controlId="code">
          <Form.ControlLabel>Mã điểm danh</Form.ControlLabel>
          <Form.Control name="code" type="code" autoComplete="off" />
          <Form.HelpText tooltip>Đây là thông tin bắt buộc</Form.HelpText>
        </Form.Group>
        <Form.Group controlId="camera">
          <Form.ControlLabel>Chụp hình</Form.ControlLabel>
          {showCamera && cameraPermission ?
            <Camera data={getUrlImageFromCamera} />
          : <Button
              appearance="primary"
              color="green"
              onClick={() => handleOpen()}
            >
              <CameraAltIcon />
              &nbsp; Chụp ngay
            </Button>
          }
          <Form.HelpText tooltip>Đây là thông tin bắt buộc</Form.HelpText>
        </Form.Group>
        <Form.Group controlId="Location">
          <Form.ControlLabel>Vị trí</Form.ControlLabel>
          <Location />
        </Form.Group>
        <Form.Group className="flex justify-center flex-wrap content-center border-t mt-5 p-10 custom-border-color">
          {cameraPermission && locationPermission ?
            <ButtonToolbar>
              <Button
                size="lg"
                style={{
                  backgroundColor: "#18bd5b",
                  color: "white",
                  width: "140px",
                  padding: "10px 15px",
                }}
                onClick={() => handleUploadImageFirebase()}
              >
                Gửi
              </Button>
            </ButtonToolbar>
          : <p className="text-center">
              Vui lòng cho phép truy cập máy ảnh và vị trí!
            </p>
          }
        </Form.Group>
      </Form>
    </div>
  );
}
