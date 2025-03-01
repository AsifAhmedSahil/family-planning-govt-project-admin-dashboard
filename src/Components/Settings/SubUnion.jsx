import Header from "../Header";
import { useState } from "react";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import { RiDeleteBin6Line } from "react-icons/ri";

const SubUnion = () => {
  const [data, setData] = useState([
    {
      union_name: "বোয়ালখালি",
      officers: "২৩ জন",
    },
    {
      union_name: "চন্দনাইশ",
      officers: "২৩ জন",
    },
    {
      union_name: "ফটিকছড়ি",
      officers: "২৩ জন",
    },
    {
      union_name: "হাটহাজারি",
      officers: "২৩ জন",
    },
    {
      union_name: "লোহাগাড়া",
      officers: "২৩ জন",
    },
    {
      union_name: "কুশাখালি",
      officers: "২৩ জন",
    },
    {
      union_name: "দালাল বাজার",
      officers: "২৩ জন",
    },
    {
      union_name: "উত্তর হামছাদী",
      officers: "২৩ জন",
    },
  ]);

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
      <Header title={"উপজেলার তথ্য"} />
      <div className="dashboard p-3 " style={{ backgroundColor: "#FFFFFF" }}>
        <div className="filter mb-4" style={{ margin: "26px" }}>
          <div className="row g-6 ">
            {" "}
            {/* g-6 adds gap between columns */}
            <div className="col-md-2 d-flex flex-column mb-3">
              <label className="mb-2 text-[16px] " style={{ color: "#323232" }}>
                জেলা
              </label>
              <input type="text" className="form-control" />
            </div>
            <div className="col-md-2 d-flex flex-column mb-3">
              <label className="mb-2 text-[16px] " style={{ color: "#323232" }}>
                উপজেলা
              </label>
              <input type="text" className="form-control" />
            </div>
            <div className="col-md-2 d-flex flex-column mb-3">
              <label className="mb-2 text-[16px] "></label>
              <button
                type="button"
                className="btn w-100 text-white mt-4"
                style={{ backgroundColor: "#13007D" }}
              >
                যোগ করুন
              </button>
            </div>
          </div>
        </div>

        <hr style={{ color: "gray" }} />

        <div className="table-container" style={{ margin: "26px" }}>
          <div
            className="table-responsive"
            style={{ maxHeight: "500px", overflowY: "auto" }}
          >
            <table className="table" style={{ width: "100%" }}>
              <thead
                style={{
                  position: "sticky",
                  top: 0,
                  backgroundColor: "#fff",
                  zIndex: 1,
                }}
              >
                <tr>
                  <th
                    style={{
                      color: "#323232",
                      position: "sticky",
                      top: 0,
                      backgroundColor: "#fff",
                    }}
                  >
                    ক্রমিক
                  </th>
                  <th
                    style={{
                      color: "#323232",
                      position: "sticky",
                      top: 0,
                      backgroundColor: "#fff",
                    }}
                  >
                    জেলা
                  </th>
                  <th
                    style={{
                      color: "#323232",
                      position: "sticky",
                      top: 0,
                      backgroundColor: "#fff",
                    }}
                  >
                    কর্মকর্তা
                  </th>

                  <th
                    style={{
                      color: "#323232",
                      position: "sticky",
                      top: 0,
                      backgroundColor: "#fff",
                    }}
                  ></th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={index}>
                    <td style={{ color: "#6C6C6C" }}>
                      {convertToBangla(index + 1)}
                    </td>
                    <td style={{ color: "#6C6C6C" }}>{item.union_name}</td>
                    <td style={{ color: "#6C6C6C" }}>{item.officers}</td>

                    <td>
                      <RiDeleteBin6Line
                        size={30}
                        style={{ color: "red", cursor: "pointer" }}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubUnion;
