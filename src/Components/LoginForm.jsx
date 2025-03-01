import logo from "../assets/logo.png";
const LoginForm = () => {
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
        <div className="card-body mx-auto"style={{
        //   backgroundColor: "#13007D0D",
          width: "100%",
          maxWidth: "348px",
          height: "auto",
          
        }} >
          <div className=" mb-4">
            <img
              src={logo} // Replace with your logo path
              alt="Logo"
              className="img-fluid"
              style={{ width: "100px" }}
            />
            <h4 className="card-title mt-3" style={{ fontSize: "20px",color:"#565656" }}>
              পরিবার পরিকল্পনা স্মার্ট মনিটরিং সিস্টেমে{" "}
              <span style={{ color: "#13007D" }}>আপনাকে স্বাগতম!</span>
            </h4>
            <p className="pt-2" style={{color:"#565656"}}>আপনার উপস্থিতি দিতে লগইন করুন</p>
          </div>
          <form>
            <div className="form-group pb-2"  style={{color:"#565656"}}>
              <label htmlFor="mobileNumber" className="pb-2" >মোবাইল নম্বর</label>
              <input 
                type="text"
                className="form-control "
                id="mobileNumber"
                placeholder="০১৭XX-XXX-XXX"
              />
            </div>
            <div className="form-group pb-2"  style={{color:"#565656"}}>
              <label htmlFor="password" className="pb-2">পাসওয়ার্ড</label>
              <input
                type="password"
                className="form-control "
                id="password"
                placeholder="********"
              />
              <p className="text-end pt-2" style={{color:"#13007D",fontSize:"12px"}} >পাসওয়ার্ড ভুলে গিয়েছি</p>
            </div>
            <button type="submit" className="btn  w-100" style={{backgroundColor:"#13007D",color:"white"}}>
              প্রবেশ করুন
            </button>
          </form>
          {/* <div className="text-center mt-3">
            <a href="#" className="text-muted">
              পাসওয়ার্ড ভুলে গেছেন?
            </a>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
