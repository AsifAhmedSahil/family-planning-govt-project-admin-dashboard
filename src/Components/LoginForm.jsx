import  { useState } from "react";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
// import { useUser } from "../context/UserProvider";
// import { jwtDecode } from "jwt-decode";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    emp_id: "",
    password: "",
  });

  const navigate = useNavigate()

  // const {setUser} = useUser()
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    try {
      const response = await fetch("http://localhost:5000/api/auth/login",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(formData)

      })
      console.log(response)
      if(response.ok){
        const data = await response.json()
        console.log("token",data.token)
        localStorage.setItem("authToken",data.token)
        navigate("/")
      }
      else{
        console.error("Login Failed",response.statusText)
      }

    } catch (error) {
      console.log(error)
      
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh", backgroundColor: "#f0f0f0" }}
    >
      <div
        className="card"
        style={{
          backgroundColor: "#13007D0D",
          width: "100%",
          maxWidth: "421px",
          height: "auto",
          padding: "20px",
        }}
      >
        <div className="card-body mx-auto"
          style={{
            width: "100%",
            maxWidth: "348px",
            height: "auto",
          }}
        >
          <div className="mb-4">
            <img
              src={logo}
              alt="Logo"
              className="img-fluid"
              style={{ width: "100px" }}
            />
            <h4 className="card-title mt-3" style={{ fontSize: "20px", color: "#565656" }}>
              পরিবার পরিকল্পনা স্মার্ট মনিটরিং সিস্টেমে{" "}
              <span style={{ color: "#13007D" }}>আপনাকে স্বাগতম!</span>
            </h4>
            <p className="pt-2" style={{ color: "#565656" }}>
              আপনার উপস্থিতি দিতে লগইন করুন
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-group pb-2" style={{ color: "#565656" }}>
              <label htmlFor="emp_id" className="pb-2">
                মোবাইল নম্বর
              </label>
              <input
                type="text"
                className="form-control"
                id="emp_id"
                placeholder="০১৭XX-XXX-XXX"
                value={formData.emp_id}
                onChange={handleChange}
              />
            </div>
            <div className="form-group pb-2" style={{ color: "#565656" }}>
              <label htmlFor="password" className="pb-2">
                পাসওয়ার্ড
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="********"
                value={formData.password}
                onChange={handleChange}
              />
              <p className="text-end pt-2" style={{ color: "#13007D", fontSize: "12px" }}>
                পাসওয়ার্ড ভুলে গিয়েছি
              </p>
            </div>
            <button type="submit" className="btn w-100" style={{ backgroundColor: "#13007D", color: "white" }}>
              প্রবেশ করুন
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
