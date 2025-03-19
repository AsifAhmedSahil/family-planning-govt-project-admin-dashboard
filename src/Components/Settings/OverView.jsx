import { useEffect, useState } from "react";
import Header from "../Header";

const OverView = () => {
  const [unions, setUnions] = useState([]);
  const [units, setUnits] = useState([]);
  const [upazilas, setUpazila] = useState([]);

  const fetchUnions = async () => {
    const token = localStorage.getItem("authToken");
    try {
      const response = await fetch(
        `${import.meta.env.REACT_APP_BASE_URL}/api/setup/get-unions`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const result = await response.json();
        setUnions(result); // Update the state with fetched data
      } else {
        const errorResult = await response.json();
        console.error("Error fetching unions:", errorResult);
      }
    } catch (error) {
      console.error("Error fetching unions:", error);
    }
  };

  const fetchUnits = async () => {
    const token = localStorage.getItem("authToken");
    try {
      const response = await fetch(
        `${import.meta.env.REACT_APP_BASE_URL}/api/setup/get-units`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const result = await response.json();
        setUnits(result);
      } else {
        const errorResult = await response.json();
        console.error("Error fetching units:", errorResult);
      }
    } catch (error) {
      console.error("Error fetching units:", error);
    }
  };
  const fetchUpazilas = async () => {
    const token = localStorage.getItem("authToken");
    try {
      const response = await fetch(
        `${import.meta.env.REACT_APP_BASE_URL}/api/setup/get-upazilas`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const result = await response.json();
        console.log(result, "****");
        setUpazila(result); // Update the state with fetched data
      } else {
        const errorResult = await response.json();
        console.error("Error fetching upazilas:", errorResult);
      }
    } catch (error) {
      console.error("Error fetching upazilas:", error);
    }
  };

  useEffect(() => {
    fetchUnions();
    fetchUnits()
    fetchUpazilas()
  }, []);

  const convertToBangla = (number) => {
    const banglaDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
    return number
      .toString()
      .split("")
      .map((digit) => banglaDigits[parseInt(digit)])
      .join("");
  };
  return (
    <div>
      <Header title={"উপস্থিতি"} />
      <div
        className="  dashboard p-3"
        style={{ backgroundColor: "#FFFFFF", height: "700px" }}
      >
        <div className="filter mb-4" style={{ margin: "26px" }}>
          <div className=" mb-4">
            <strong><p  style={{color:"#565656"}}>জেলা - চট্টগ্রাম</p></strong>
          </div>

          <div className="content">
            <div style={{color:"#565656"}}>
              <p className="mb-3">
                <strong >অফিসের ঠিকানা</strong>
              </p>
              <p className="mb-3 " style={{ width: "250px" }}>
                জেলা পরিবার পরিকল্পনা কার্যালয়, জাম্বুরি পার্ক সংলগ্ন, আগ্রাবাদ,
                চট্টগ্রাম
              </p>
            </div>
            <div style={{color:"#565656"}}>
              <p className="mb-3">
                <strong >সর্বমোট উপজেলা </strong>
              </p>
              <p className="mb-3 " style={{ width: "250px" }}>
              {convertToBangla(upazilas.length)}
              </p>
            </div>
            <div style={{color:"#565656"}}>
              <p className="mb-3">
                <strong >সর্বমোট ইউনিয়ন</strong>
              </p>
              <p className="mb-3 " style={{ width: "250px" }}>
              {convertToBangla(unions.length)}
              </p>
            </div>
            <div style={{color:"#565656"}}>
              <p className="mb-3">
                <strong >সর্বমোট ইউনিট</strong>
              </p>
              <p className="mb-3 " style={{ width: "250px" }}>
              {convertToBangla(units.length)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverView;
