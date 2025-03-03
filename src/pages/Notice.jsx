import { SlLocationPin } from "react-icons/sl";
import Header from "../Components/Header";
import { HiDotsVertical } from "react-icons/hi";
import { FaClipboardList } from "react-icons/fa";

const Notice = () => {
  const leftSectionStyle = {
    width: "30%",
    height: "700px",
    // backgroundColor: '#f9f9f9',
    padding: "20px",
    // boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    borderRight: "1px solid #ddd",
  };

  const rightSectionStyle = {
    width: "70%",
    height: "700px",
    // backgroundColor: '#ffffff',
    padding: "20px",
    overflowY: "auto",
    maxHeight: "80vh", // Adjust based on your layout needs
  };

  const cardStyle = {
    border: "1px solid #ddd",
    borderRadius: "5px",
    marginBottom: "10px",
    // padding: "15px",
    backgroundColor: "#e9ecef",
  };

  const iconStyle = {
    backgroundColor: "#E7E6F2",
    color: "#857CBC",
    width: "120px",
    height: "155px",
    display: "flex",
    // alignItems: "center",
    paddingTop:"10px",
    justifyContent: "center",
  };

  const cardData = [
    {
      date: "১২ অগাস্ট, ২০২৩",
      description:
        "সমস্ত কর্মকর্তা-কর্মচারীদের অবগতির জন্য জানানো যাচ্ছে যে, পরিবার পরিকল্পনা সচেতনতা ও সেবা বিষয়ে পরামর্শের জন্য নিকটস্থ স্বাস্থ্যকেন্দ্রে যোগাযোগ করুন, সমস্ত কর্মকর্তা-কর্মচারীদের অবগতির জন্য জানানো যাচ্ছে যে, পরিবার পরিকল্পনা সচেতনতা ও সেবা বিষয়ে পরামর্শের জন্য নিকটস্থ স্বাস্থ্যকেন্দ্রে যোগাযোগ করুন।।",
    },
    {
      date: "১৩ অগাস্ট, ২০২৩",
      description:
        "সসমস্ত কর্মকর্তা-কর্মচারীদের অবগতির জন্য জানানো যাচ্ছে যে, পরিবার পরিকল্পনা সচেতনতা ও সেবা বিষয়ে পরামর্শের জন্য নিকটস্থ স্বাস্থ্যকেন্দ্রে যোগাযোগ করুন, সমস্ত কর্মকর্তা-কর্মচারীদের অবগতির জন্য জানানো যাচ্ছে যে, পরিবার পরিকল্পনা সচেতনতা ও সেবা বিষয়ে পরামর্শের জন্য নিকটস্থ স্বাস্থ্যকেন্দ্রে যোগাযোগ করুন।।ঠিক সময়ে উপস্থিত",
    },
    {
      date: "১৪ অগাস্ট, ২০২৩",
      description:
        "সসমস্ত কর্মকর্তা-কর্মচারীদের অবগতির জন্য জানানো যাচ্ছে যে, পরিবার পরিকল্পনা সচেতনতা ও সেবা বিষয়ে পরামর্শের জন্য নিকটস্থ স্বাস্থ্যকেন্দ্রে যোগাযোগ করুন, সমস্ত কর্মকর্তা-কর্মচারীদের অবগতির জন্য জানানো যাচ্ছে যে, পরিবার পরিকল্পনা সচেতনতা ও সেবা বিষয়ে পরামর্শের জন্য নিকটস্থ স্বাস্থ্যকেন্দ্রে যোগাযোগ করুন।।ঠিক সময়ে উপস্থিত",
    },
    {
      date: "১৪ অগাস্ট, ২০২৩",
      description:
        "সসমস্ত কর্মকর্তা-কর্মচারীদের অবগতির জন্য জানানো যাচ্ছে যে, পরিবার পরিকল্পনা সচেতনতা ও সেবা বিষয়ে পরামর্শের জন্য নিকটস্থ স্বাস্থ্যকেন্দ্রে যোগাযোগ করুন, সমস্ত কর্মকর্তা-কর্মচারীদের অবগতির জন্য জানানো যাচ্ছে যে, পরিবার পরিকল্পনা সচেতনতা ও সেবা বিষয়ে পরামর্শের জন্য নিকটস্থ স্বাস্থ্যকেন্দ্রে যোগাযোগ করুন।।ঠিক সময়ে উপস্থিত",
    },
    {
      date: "১৪ অগাস্ট, ২০২৩",
      description:
        "সসমস্ত কর্মকর্তা-কর্মচারীদের অবগতির জন্য জানানো যাচ্ছে যে, পরিবার পরিকল্পনা সচেতনতা ও সেবা বিষয়ে পরামর্শের জন্য নিকটস্থ স্বাস্থ্যকেন্দ্রে যোগাযোগ করুন, সমস্ত কর্মকর্তা-কর্মচারীদের অবগতির জন্য জানানো যাচ্ছে যে, পরিবার পরিকল্পনা সচেতনতা ও সেবা বিষয়ে পরামর্শের জন্য নিকটস্থ স্বাস্থ্যকেন্দ্রে যোগাযোগ করুন।।ঠিক সময়ে উপস্থিত",
    },
    {
      date: "১৪ অগাস্ট, ২০২৩",
      description:
        "সসমস্ত কর্মকর্তা-কর্মচারীদের অবগতির জন্য জানানো যাচ্ছে যে, পরিবার পরিকল্পনা সচেতনতা ও সেবা বিষয়ে পরামর্শের জন্য নিকটস্থ স্বাস্থ্যকেন্দ্রে যোগাযোগ করুন, সমস্ত কর্মকর্তা-কর্মচারীদের অবগতির জন্য জানানো যাচ্ছে যে, পরিবার পরিকল্পনা সচেতনতা ও সেবা বিষয়ে পরামর্শের জন্য নিকটস্থ স্বাস্থ্যকেন্দ্রে যোগাযোগ করুন।।ঠিক সময়ে উপস্থিত",
    },
    // Add more objects as needed
  ];
  return (
    <div>
      <Header title={"নোটিশ"} />
      <div style={{ display: "flex", marginTop: "50px" }}>
        {/* Left Section */}
        <div style={leftSectionStyle}>
          <div className="col-md-12 d-flex flex-column mb-3">
            <label className="mb-2 text-[16px]">তারিখ</label>
            <input
              type="date"
              className="form-control"
              aria-label="Select date"
              style={{ borderRadius: "5px" }} // Optional: Customize border radius if needed
            />
          </div>
          <div className="col-md-12 d-flex flex-column mb-3">
            <label className="mb-2 text-[16px]">নোটিশ</label>
            <textarea
              className="form-control"
              aria-label="Enter notice"
              placeholder="নোটিশ লিখুন"
              style={{
                borderRadius: "5px",
                height: "300px",
                resize: "none",
                paddingTop: "10px",
              }}
            />
          </div>

          <button
            style={{
              width: "100%",
              padding: "10px",
              backgroundColor: "#13007D",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            নোটিশ দিন
          </button>
        </div>

        {/* Right Section */}
        <div style={rightSectionStyle}>
          <h4 style={{ marginBottom: "20px"}}>পূর্বের নোটিশ</h4>
          {cardData.map((card, index) => (
            <div key={index} style={cardStyle}>
              <div style={{ display: "flex" }}>
                <div style={iconStyle} >
                  <FaClipboardList size={25} fill="#13007D"/>
                </div>
                <div style={{padding:"10px"}}>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <p>{card.date}</p>
                  <span style={{ cursor: "pointer" }}>
                    <HiDotsVertical />
                  </span>
                </div>
                <p>{card.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notice;
