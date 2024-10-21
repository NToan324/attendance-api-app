import React, { useEffect, useState } from "react";
import "rsuite/dist/rsuite.min.css";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";

import Location from "./location";
import Camera from "./camera";
import formService from "../service/form/formService";
import { imageDb } from "../service/firebase/config";

import { Form, ButtonToolbar, Button } from "rsuite";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { info } from "autoprefixer";

export default function FormComponent() {
  const [showCamera, setShowCamera] = useState(false);
  const [cameraPermission, setCameraPermission] = useState(false);
  const [locationPermission, setLocationPermission] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [infoUser, setInfoUser] = useState({
    fullName: "",
    studentCode: "",
    code: "",
    location: [],
  });

  const handleOpen = () => {
    setShowCamera(true);
  };

  const handleUploadImageFirebase = async () => {
    try {
      const imgRef = ref(imageDb, `image/${v4()}`);
      if (imageUrl) {
        await uploadBytes(imgRef, imageUrl);
        const result = await getDownloadURL(imgRef);
        return {
          ...infoUser,
          imageUrl: result,
        };
      }
      return {
        ...infoUser,
        imageUrl: "",
      };
    } catch (error) {
      throw new Error(error);
    }
  };

  const getDataFromInput = (_, e) => {
    const { name, value } = e.target;
    setInfoUser({
      ...infoUser,
      [name]: value,
    });
  };

  const checkIsEmty = () => {
    for (const key in infoUser) {
      if (!infoUser[key]) {
        console.log("missing", key);
        return true;
      }
    }
    return false;
  };

  const hanldeSubmit = async () => {
    try {
      const updateInfo = await handleUploadImageFirebase();
      const isEmty = checkIsEmty();
      if (updateInfo.imageUrl === "") {
        console.log("missing image");
        return;
      }
      if (!isEmty) {
        const result = await formService(updateInfo);
        console.log("submit", result);
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  const getUrlImageFromCamera = async (url) => {
    setImageUrl(url);
  };

  const getLocationData = async (location) => {
    setInfoUser({
      ...infoUser,
      location: [location.latitude, location.longitude],
    });
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
          <Form.Control
            name="fullName"
            value={infoUser.fullName || ""}
            onChange={(_, e) => getDataFromInput(_, e)}
          />
          <Form.HelpText>Đây là thông tin bắt buộc</Form.HelpText>
        </Form.Group>
        <Form.Group controlId="studentCode">
          <Form.ControlLabel>Mã số sinh viên</Form.ControlLabel>
          <Form.Control
            name="studentCode"
            value={infoUser.studentCode || ""}
            onChange={(_, e) => getDataFromInput(_, e)}
          />
          <Form.HelpText tooltip>Đây là thông tin bắt buộc</Form.HelpText>
        </Form.Group>
        <Form.Group controlId="code">
          <Form.ControlLabel>Mã điểm danh</Form.ControlLabel>
          <Form.Control
            name="code"
            value={infoUser.code || ""}
            onChange={(_, e) => getDataFromInput(_, e)}
          />
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
          <Location data={getLocationData} />
        </Form.Group>
        <Form.Group className="flex justify-center flex-wrap content-center border-t mt-5 p-10 custom-border-color">
          <ButtonToolbar>
            <Button
              size="lg"
              style={{
                backgroundColor: "#18bd5b",
                color: "white",
                width: "140px",
                padding: "10px 15px",
              }}
              onClick={() => hanldeSubmit()}
            >
              Gửi
            </Button>
          </ButtonToolbar>
        </Form.Group>
      </Form>
    </div>
  );
}
