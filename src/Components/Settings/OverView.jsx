import Header from "../Header";

const OverView = () => {
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
              ১৭
              </p>
            </div>
            <div style={{color:"#565656"}}>
              <p className="mb-3">
                <strong >সর্বমোট ইউনিয়ন</strong>
              </p>
              <p className="mb-3 " style={{ width: "250px" }}>
              ২৮
              </p>
            </div>
            <div style={{color:"#565656"}}>
              <p className="mb-3">
                <strong >সর্বমোট ইউনিট</strong>
              </p>
              <p className="mb-3 " style={{ width: "250px" }}>
              ৫৬
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverView;
