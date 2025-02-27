import TimePicker from "react-time-picker";
import Header from "../Header";
import { useState } from "react";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import { RiDeleteBin6Line } from "react-icons/ri";

const Designation = () => {
  const [value, onChange] = useState("10:00");

  const [data, setData] = useState([
    {
      name: "অফিস স্টাফ",
      startTime: "০৯:০০",
      endTime: "০৫:০০",
      duration: "20 দিন",
    },
    {
      name: "ফার্মাসিস্ট",
      startTime: "০৯:০০",
      endTime: "০৫:০০",
      duration: "10 দিন",
    },
    {
      name: "স্যাকমো",
      startTime: "০৯:০০",
      endTime: "০৫:০০",
      duration: "10 দিন",
    },
    {
      name: "পদবী ১",
      startTime: "০৯:০০",
      endTime: "০৫:০০",
      duration: "10 দিন",
    },
    {
      name: "এফডব্লিউভি",
      startTime: "০৯:০০",
      endTime: "০৫:০০",
      duration: "10 দিন",
    },
    {
      name: "অফিস স্টাফ",
      startTime: "০৯:০০",
      endTime: "০৫:০০",
      duration: "20 দিন",
    },
    {
      name: "ফার্মাসিস্ট",
      startTime: "০৯:০০",
      endTime: "০৫:০০",
      duration: "10 দিন",
    },
    {
      name: "অফিস স্টাফ",
      startTime: "০৯:০০",
      endTime: "০৫:০০",
      duration: "20 দিন",
    },
    {
      name: "ফার্মাসিস্ট",
      startTime: "০৯:০০",
      endTime: "০৫:০০",
      duration: "10 দিন",
    },
    {
      name: "অফিস স্টাফ",
      startTime: "০৯:০০",
      endTime: "০৫:০০",
      duration: "20 দিন",
    },
    {
      name: "ফার্মাসিস্ট",
      startTime: "০৯:০০",
      endTime: "০৫:০০",
      duration: "10 দিন",
    },

    // Add more data objects as needed
  ]);

  // const [filter, setFilter] = useState({
  //   name: "",
  //   startTime: "",
  //   endTime: "",
  //   duration: "",
  // });

  // const handleFilterChange = (e) => {
  //   const { name, value } = e.target;
  //   setFilter({
  //     ...filter,
  //     [name]: value,
  //   });
  // };

  // const applyFilter = () => {
  //   // Logic to filter data based on the filter state
  //   console.log("Filter applied:", filter);
  //   // Implement filtering logic here
  // };

  return (
    <div>
      <Header title={"পদবীর তথ্য"} />

      <div className="dashboard p-3 " style={{backgroundColor:"#FFFFFF"}}>
        <div className="filter mb-4" style={{margin:"26px"}}>
          <div className="row g-6 " >
            {" "}
            {/* g-6 adds gap between columns */}
            <div className="col-md-2 d-flex flex-column mb-3">
              <label className="mb-2 text-[16px] " style={{ color: "#323232" }}>
                পদবীর নাম
              </label>
              <input type="text" className="form-control" />
            </div>
            <div className="col-md-2 d-flex flex-column mb-3">
              <label className="mb-2 text-[16px]" style={{ color: "#323232" }}>
                উপস্থিতির সময়
              </label>
              <TimePicker
                onChange={onChange}
                value={value}
                className="form-control"
              />
            </div>
            <div className="col-md-2 d-flex flex-column mb-3">
              <label className="mb-2 text-[16px]" style={{ color: "#323232" }}>
                প্রস্থানের সময়
              </label>
              <TimePicker
                onChange={onChange}
                value={value}
                className="form-control"
                style={{ width: "100%" }}
              />
            </div>
            <div className="col-md-2 d-flex flex-column mb-3">
              <label className="mb-2 text-[16px]" style={{ color: "#323232" }}>
                মোট ছুটি
              </label>
              <input
                type="text"
                className="form-control"
                style={{ width: "100%" }}
              />
            </div>
            <div className="col-md-2 d-flex flex-column mb-3">
              <label className="mb-2 text-[16px] "></label>
              <button
                type="button"
                className="btn w-100 text-white mt-4"
                style={{ backgroundColor: "#13007D" }}
              >
                পদবী যোগ করুন
              </button>
            </div>
          </div>
        </div>

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
                    পদবী
                  </th>
                  <th
                    style={{
                      color: "#323232",
                      position: "sticky",
                      top: 0,
                      backgroundColor: "#fff",
                    }}
                  >
                    উপস্থিতির সময়
                  </th>
                  <th
                    style={{
                      color: "#323232",
                      position: "sticky",
                      top: 0,
                      backgroundColor: "#fff",
                    }}
                  >
                    প্রস্থানের সময়
                  </th>
                  <th
                    style={{
                      color: "#323232",
                      position: "sticky",
                      top: 0,
                      backgroundColor: "#fff",
                    }}
                  >
                    মোট ছুটি
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
                    <td style={{ color: "#6C6C6C" }}>{item.name}</td>
                    <td style={{ color: "#6C6C6C" }}>{item.startTime}</td>
                    <td style={{ color: "#6C6C6C" }}>{item.endTime}</td>
                    <td style={{ color: "#6C6C6C" }}>{item.duration}</td>
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

export default Designation;
