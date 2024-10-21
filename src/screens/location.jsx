import React, { useEffect, useState } from "react";

function Location({ data }) {
  const [location, setLocation] = useState({});

  useEffect(() => {
    function getLocation() {
      try {
        navigator.geolocation.getCurrentPosition((position) => {
          const newLocation = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          setLocation(newLocation);
          data(newLocation);
        });
      } catch (error) {
        throw new Error(error);
      }
    }
    getLocation();
  }, []);

  return (
    <div className="border fxxlex flex-col bg-gray">
      <div className="latitude flex ">
        <p className="bg-gray-dark px-5 py-2 w-28 text-center text-white">
          Vĩ độ
        </p>
        <p className="pl-4 w-full h-full ">{location.latitude}</p>
      </div>
      <div className="longitude flex">
        <p className="bg-gray-dark px-5 py-2 w-28 text-center text-white">
          Kinh độ
        </p>
        <p className="pl-4 w-full h-full">{location.longitude}</p>
      </div>
    </div>
  );
}

export default Location;
