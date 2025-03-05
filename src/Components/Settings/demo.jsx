import Header from "../Header";
import { useEffect, useState } from "react";
import Select from 'react-select';
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import { RiDeleteBin6Line } from "react-icons/ri";
import 'react-select/dist/styles.css';

const Union = () => {
  const [upazilas, setUpazilas] = useState([]);
  const [unions, setUnions] = useState([]);
  const [data, setData] = useState([
    { union_name: "শাকচর", officers: "২৩ জন" },
    { union_name: "হাজিরপারা", officers: "২৩ জন" },
    { union_name: "কুশাখালি", officers: "২৩ জন" },
    { union_name: "দালাল বাজার", officers: "২৩ জন" },
    { union_name: "উত্তর হামছাদী", officers: "২৩ জন" },
  ]);

  const [formData, setFormData] = useState({
    upazila: null,
    union: "",
  });

  const fetchUpazilas = async () => {
    const token = localStorage.getItem("authToken");
    try {
      const response = await fetch(
        "http://localhost:5001/api/setup/get-upazilas",
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
        setUpazilas(result); // Update the state with fetched data
      } else {
        const errorResult = await response.json();
        console.error("Error fetching upazilas:", errorResult);
      }
    } catch (error) {
      console.error("Error fetching upazilas:", error);
    }
  };

  const fetchUnions = async () => {
    const token = localStorage.getItem("authToken");
    try {
      const response = await fetch(
        "http://localhost:5001/api/setup/get-unions",
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

  // Fetch upazilas and unions when the component mounts
  useEffect(() => {
    fetchUpazilas();
    fetchUnions();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    const token = localStorage.getItem("authToken");

    try {
      const response = await fetch(
        "http://localhost:5001/api/setup/add-union",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: formData.union,
            upazila_id: formData.upazila ? formData.upazila.value : null,
          }),
        }
      );

      if (response.ok) {
        const result = await response.json();
        console.log("Success:", result);
        await fetchUnions();
        setFormData({ upazila: null, union: "" });
      } else {
        const errorResult = await response.json();
        console.error("Error:", errorResult);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleUpazilaChange = (selectedOption) => {
    setFormData({
      ...formData,
      upazila: selectedOption,
    });
  };

  const handleUnionChange = (e) => {
    setFormData({
      ...formData,
      union: e.target.value,
    });
  };

  const convertToBangla = (number) => {
    const banglaDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
    return number
      .toString()
      .split("")
      .map((digit) => banglaDigits[parseInt(digit)])
      .join("");
  };

  const upazilaOptions = upazilas.map((upazila) => ({
    value: upazila.id,
    label: upazila.name,
  }));

  return (
    <div>
      <Header title={"ইউনিয়নের তথ্য"} />
      <div className="dashboard p-3" style={{ backgroundColor: "#FFFFFF" }}>
        <div className="filter mb-4" style={{ margin: "26px" }}>
          <form onSubmit={handleSubmit}>
            <div className="row g-6">
              <div className="col-md-2 d-flex flex-column mb-3">
                <label className="mb-2 text-[16px]" style={{ color: "#323232" }}>
                  জেলা
                </label>
                <input
                  type="text"
                  value={"চট্টগ্রাম"}
                  className="form-control"
                  readOnly
                />
              </div>
              <div className="col-md-2 d-flex flex-column mb-3">
                <label className="mb-2 text-[16px]" style={{ color: "#323232" }}>
                  উপজেলা
                </label>
                <Select
                  options={upazilaOptions}
                  value={formData.upazila}
                  onChange={handleUpazilaChange}
                  isClearable
                  placeholder="Select an Upazila"
                />
              </div>
              <div className="col-md-2 d-flex flex-column mb-3">
                <label className="mb-2 text-[16px]" style={{ color: "#323232" }}>
                  ইউনিয়ন
                </label>
                <input
                  type="text"
                  name="union"
                  value={formData.union}
                  onChange={handleUnionChange}
                  className="form-control"
                />
              </div>
              <div className="col-md-2 d-flex flex-column mb-3">
                <label className="mb-2 text-[16px]"></label>
                <button
                  type="submit"
                  className="btn w-100 text-white mt-4"
                  style={{ backgroundColor: "#13007D" }}
                >
                  যোগ করুন
                </button>
              </div>
            </div>
          </form>
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
                    ইউনিয়ন
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

export default Union;
