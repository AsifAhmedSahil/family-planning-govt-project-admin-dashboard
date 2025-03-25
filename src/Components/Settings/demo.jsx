{/* modal */}

<div
className="modal fade"
id="officerModal"
tabIndex="-1"
aria-labelledby="officerModalLabel"
aria-hidden="true"
style={{ overflowX: "hidden" }}
>
<div
  className="modal-dialog modal-dialog-centered modal-dialog-scrollable"
  style={{
    width: "70%", // Set the width of the modal to 70%
    height: "70%", // Set the height of the modal to 70%
    maxHeight: "90vh", // Ensure the modal's height doesn't exceed 90% of the viewport
    maxWidth: "60vw", // Ensure the modal's height doesn't exceed 90% of the viewport
    marginLeft: "auto", // Center the modal horizontally
    marginRight: "auto", // Center the modal horizontally
  }}
>
  <div className="modal-content" style={{ padding: "30px" }}>
    <div className="modal-header">
      <h5 className="modal-title" id="officerModalLabel">
        {/* Modal Title */}
      </h5>
      <button
        type="button"
        className="btn-close"
        data-bs-dismiss="modal"
        aria-label="Close"
      ></button>
    </div>
    <div className="modal-body" style={{ overflowX: "hidden" }}>
      {/* Modal Content */}
      <div className="row g-5">
        <div className="col-md-3 d-flex flex-column mb-3">
          <label
            className="mb-2 text-[16px]"
            style={{ color: "#13007D" }}
          >
            কাজের ক্ষেত্র
          </label>
          <p>বাড়ি পরিদর্শন</p>
        </div>
        <div className="col-md-3 d-flex flex-column mb-3">
          <label
            className="mb-2 text-[16px]"
            style={{ color: "#13007D" }}
          >
            দম্পতি নাম্বার
          </label>
          <p>১২০৯১১২</p>
        </div>
        <div className="col-md-3 d-flex flex-column mb-3">
          <label
            className="mb-2 text-[16px]"
            style={{ color: "#13007D" }}
          >
            দম্পতির নাম
          </label>
          <p>মাসুমা সুলতানা</p>
        </div>
        <div className="col-md-3 d-flex flex-column mb-3">
          <label
            className="mb-2 text-[16px]"
            style={{ color: "#13007D" }}
          >
            স্বামীর নাম
          </label>
          <p>আবদুল বাতেন</p>
        </div>
      </div>
      <div className="row g-5">
        <div className="col-md-3 d-flex flex-column mb-3">
          <label
            className="mb-2 text-[16px]"
            style={{ color: "#13007D" }}
          >
            ছেলে-মেয়ের সংখ্যা
          </label>
          <p>৩ জন</p>
        </div>
        <div className="col-md-3 d-flex flex-column mb-3">
          <label
            className="mb-2 text-[16px]"
            style={{ color: "#13007D" }}
          >
            পদ্ধতির নাম
          </label>
          <p>খাবার বড়ি</p>
        </div>
        <div className="col-md-3 d-flex flex-column mb-3">
          <label
            className="mb-2 text-[16px]"
            style={{ color: "#13007D" }}
          >
            মোবাইল নাম্বার
          </label>
          <p>মাসুমা সুলতানা</p>
        </div>
        <div className="col-md-3 d-flex flex-column mb-3">
          <label
            className="mb-2 text-[16px]"
            style={{ color: "#13007D" }}
          >
            সংক্ষিপ্ত ঠিকানা
          </label>
          <p>জামতলা, বাতেন বাড়ি</p>
        </div>
      </div>
      <div className="row g-5">
        <div className="col-md-3 d-flex flex-column mb-3">
          <label
            className="mb-2 text-[16px]"
            style={{ color: "#13007D" }}
          >
            ছবি
          </label>
          <p>
            <img
              src={officer}
              alt="officer"
              style={{ width: "150px", height: "150px" }}
            />
          </p>
        </div>
        <div className="col-md-6 d-flex flex-column mb-3">
          <label
            className="mb-2 text-[16px]"
            style={{ color: "#13007D" }}
          >
            বিবরন
          </label>
          <p>
            এই দম্পতিকে জন্মনিয়ন্ত্রনের পরামর্শ দেয়া হয়েছে, কিছু
            জন্মনিয়ন্ত্রক বড়ি দেয়া হয়েছে
          </p>
        </div>
      </div>
    </div>
  </div>
</div>
</div>

const workList2 = [
  { work_id: 2, work_type: 'বাড়ি পরিদর্শন', work_field: 'দম্পতি নাম্বার', work_field_type: 'text', value: '০১৯২৮৮৩৭৩৩' },
  { work_id: 2, work_type: 'বাড়ি পরিদর্শন', work_field: 'দম্পতির নাম', work_field_type: 'text', value: 'পরি মনি' },
  { work_id: 2, work_type: 'বাড়ি পরিদর্শন', work_field: 'স্বামীর নাম', work_field_type: 'text', value: 'জয়' },
  { work_id: 2, work_type: 'বাড়ি পরিদর্শন', work_field: 'ছেলে-মেয়ের সংখ্যা', work_field_type: 'text', value: '১০' },
  { work_id: 2, work_type: 'বাড়ি পরিদর্শন', work_field: 'সেবার নাম', work_field_type: 'dropdown', value: 'পরিবার পরিকল্পনা' },
  { work_id: 2, work_type: 'বাড়ি পরিদর্শন', work_field: 'মোবাইল নাম্বার', work_field_type: 'text', value: '০১৯২৮৮২৭২৮' },
  { work_id: 2, work_type: 'বাড়ি পরিদর্শন', work_field: 'সংক্ষিপ্ত ঠিকানা', work_field_type: 'text', value: 'ককক' },
  { work_id: 2, work_type: 'বাড়ি পরিদর্শন', work_field: 'ছবি', work_field_type: 'image', value: '/home/mpairproject/family-planning-server.mpairproject.xyz/Files/image/1742884064681-field_21.jpg' },
  { work_id: 2, work_type: 'বাড়ি পরিদর্শন', work_field: 'বিবরণ', work_field_type: 'text', value: 'কাজ' }
];

// Use map to extract 'work_field' and 'value'

