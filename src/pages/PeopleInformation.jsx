import { useState } from "react";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import { RiDeleteBin6Line } from "react-icons/ri";
import Header from "../Components/Header";
import officer from "../assets/officer.png";
import { FaRegEye } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";

const PeopleInformation = () => {
  const [data, setData] = useState([
    {
      name: "সাব্বির আহমেদ",
      mobile: "০১৮২৯৩৩৭৫৯৯",
      nid: "২৯৩৩৭৫৯৯",
      address: "শাকপাড়া, পূর্ব হাটহাজারী, ফতেয়াবাদ, চট্টগ্রাম",
    },
    {
      name: "সাব্বির আহমেদ",
      mobile: "০১৮২৯৩৩৭৫৯৯",
      nid: "২৯৩৩৭৫৯৯",
      address: "শাকপাড়া, পূর্ব হাটহাজারী, ফতেয়াবাদ, চট্টগ্রাম",
    },
    {
      name: "সাব্বির আহমেদ",
      mobile: "০১৮২৯৩৩৭৫৯৯",
      nid: "২৯৩৩৭৫৯৯",
      address: "শাকপাড়া, পূর্ব হাটহাজারী, ফতেয়াবাদ, চট্টগ্রাম",
    },
    {
      name: "সাব্বির আহমেদ",
      mobile: "০১৮২৯৩৩৭৫৯৯",
      nid: "২৯৩৩৭৫৯৯",
      address: "শাকপাড়া, পূর্ব হাটহাজারী, ফতেয়াবাদ, চট্টগ্রাম",
    },
    {
      name: "সাব্বির আহমেদ",
      mobile: "০১৮২৯৩৩৭৫৯৯",
      nid: "২৯৩৩৭৫৯৯",
      address: "শাকপাড়া, পূর্ব হাটহাজারী, ফতেয়াবাদ, চট্টগ্রাম",
    },
    {
      name: "সাব্বির আহমেদ",
      mobile: "০১৮২৯৩৩৭৫৯৯",
      nid: "২৯৩৩৭৫৯৯",
      address: "শাকপাড়া, পূর্ব হাটহাজারী, ফতেয়াবাদ, চট্টগ্রাম",
    },
    {
      name: "সাব্বির আহমেদ",
      mobile: "০১৮২৯৩৩৭৫৯৯",
      nid: "২৯৩৩৭৫৯৯",
      address: "শাকপাড়া, পূর্ব হাটহাজারী, ফতেয়াবাদ, চট্টগ্রাম",
    },
    {
      name: "সাব্বির আহমেদ",
      mobile: "০১৮২৯৩৩৭৫৯৯",
      nid: "২৯৩৩৭৫৯৯",
      address: "শাকপাড়া, পূর্ব হাটহাজারী, ফতেয়াবাদ, চট্টগ্রাম",
    },
    {
      name: "সাব্বির আহমেদ",
      mobile: "০১৮২৯৩৩৭৫৯৯",
      nid: "২৯৩৩৭৫৯৯",
      address: "শাকপাড়া, পূর্ব হাটহাজারী, ফতেয়াবাদ, চট্টগ্রাম",
    },
    {
      name: "সাব্বির আহমেদ",
      mobile: "০১৮২৯৩৩৭৫৯৯",
      nid: "২৯৩৩৭৫৯৯",
      address: "শাকপাড়া, পূর্ব হাটহাজারী, ফতেয়াবাদ, চট্টগ্রাম",
    },
    {
      name: "সাব্বির আহমেদ",
      mobile: "০১৮২৯৩৩৭৫৯৯",
      nid: "২৯৩৩৭৫৯৯",
      address: "শাকপাড়া, পূর্ব হাটহাজারী, ফতেয়াবাদ, চট্টগ্রাম",
    },
    {
      name: "সাব্বির আহমেদ",
      mobile: "০১৮২৯৩৩৭৫৯৯",
      nid: "২৯৩৩৭৫৯৯",
      address: "শাকপাড়া, পূর্ব হাটহাজারী, ফতেয়াবাদ, চট্টগ্রাম",
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
      <Header title={"কর্মকর্তার তথ্য"} />
      <div className="dashboard p-3 " style={{ backgroundColor: "#FFFFFF" }}>
        <div className="filter mb-4" style={{ margin: "26px" }}>
          <div className="row g-6 ">
            {" "}
            {/* g-6 adds gap between columns */}
            <div className="col-md-2 d-flex flex-column mb-3">
              <label className="mb-2 text-[16px] " style={{ color: "#323232" }}>
                পদবী
              </label>
              <select
                className="form-select"
                aria-label="Default select example"
              >
                <option selected>পদবী</option>
                <option value="1">এফডব্লিউএ</option>
              </select>
            </div>
            <div className="col-md-2 d-flex flex-column mb-3">
              <label className="mb-2 text-[16px] " style={{ color: "#323232" }}>
                জেলা
              </label>
              <select
                className="form-select"
                aria-label="Default select example"
              >
                <option selected>জেলা</option>
                <option value="1">চট্টগ্রাম</option>
              </select>
            </div>
            <div className="col-md-2 d-flex flex-column mb-3">
              <label className="mb-2 text-[16px] " style={{ color: "#323232" }}>
                উপজেলা
              </label>
              <select
                className="form-select"
                aria-label="Default select example"
              >
                <option selected>উপজেলা</option>
                <option value="1">আনোয়ারা</option>
              </select>
            </div>
            <div className="col-md-2 d-flex flex-column mb-3">
              <label className="mb-2 text-[16px] " style={{ color: "#323232" }}>
                ইউনিয়ন
              </label>
              <select
                className="form-select"
                aria-label="Default select example"
              >
                <option selected>ইউনিয়ন</option>
                <option value="1">কুশাখালি</option>
              </select>
            </div>
            <div className="col-md-2 d-flex flex-column mb-3">
              <label className="mb-2 text-[16px]" style={{ color: "#323232" }}>
                ইউনিট
              </label>
              <select
                className="form-select"
                aria-label="Default select example"
              >
                <option selected> ইউনিট</option>
                <option value="1">১ক</option>
              </select>
            </div>
            <div className="col-md-2 d-flex flex-column mb-3">
              <label className="mb-2 text-[16px] "></label>
              <button
                type="button"
                className="btn w-100 text-white mt-4"
                style={{ backgroundColor: "#13007D" }}
              >
                কর্মকর্তা যোগ করুন
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
                    আইডি
                  </th>
                  <th
                    style={{
                      color: "#323232",
                      position: "sticky",
                      top: 0,
                      backgroundColor: "#fff",
                    }}
                  >
                    নাম
                  </th>
                  <th
                    style={{
                      color: "#323232",
                      position: "sticky",
                      top: 0,
                      backgroundColor: "#fff",
                    }}
                  >
                    মোবাইল
                  </th>
                  <th
                    style={{
                      color: "#323232",
                      position: "sticky",
                      top: 0,
                      backgroundColor: "#fff",
                    }}
                  >
                    জাতীয় পরিচয়পত্র
                  </th>
                  <th
                    style={{
                      color: "#323232",
                      position: "sticky",
                      top: 0,
                      backgroundColor: "#fff",
                    }}
                  >
                    ঠিকনা
                  </th>
                  <th
                    style={{
                      color: "#323232",
                      position: "sticky",
                      top: 0,
                      backgroundColor: "#fff",
                    }}
                  >
                    ছবি
                  </th>

                  <th
                    style={{
                      color: "#323232",
                      position: "sticky",
                      top: 0,
                      backgroundColor: "#fff",
                    }}
                  ></th>
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
                    <td style={{ color: "#6C6C6C" }}>{item.name}</td>
                    <td style={{ color: "#6C6C6C" }}>{item.mobile}</td>
                    <td style={{ color: "#6C6C6C" }}>{item.nid}</td>
                    <td style={{ color: "#6C6C6C" }}>{item.address}</td>
                    <td>
                      <img
                        src={officer}
                        alt="officer"
                        style={{ width: "50px", height: "50px" }}
                      />
                    </td>

                    <td>
                      <FaRegEye
                        size={20}
                        style={{ color: "gray", cursor: "pointer" }}
                      />
                    </td>
                    <td>
                      <FaEdit
                        size={20}
                        style={{ color: "gray", cursor: "pointer" }}
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

export default PeopleInformation;
