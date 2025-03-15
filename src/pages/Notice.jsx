import { useState, useEffect } from "react";
import { MdDelete } from "react-icons/md";
import { FaClipboardList, FaEdit } from "react-icons/fa";
import Swal from "sweetalert2";
import { Modal, Button } from "react-bootstrap";
import Header from "../Components/Header";

const Notice = () => {
  const [formData, setFormData] = useState({
    date: "",
    noticeName: "",
    notice: "",
  });

  const [notices, setNotices] = useState([]);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [noticeToUpdate, setNoticeToUpdate] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    const { date, noticeName, notice } = formData;
    const token = localStorage.getItem("authToken");

    try {
      const response = await fetch(
        `${import.meta.env.REACT_APP_BASE_URL}/api/other/add-notice`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            publish_date: date,
            notice_name: noticeName,
            notice_description: notice,
          }),
        }
      );

      if (response.ok) {
        const result = await response.json();
        console.log("Success:", result);
        fetchNotices();
        setFormData({
          date: "",
          noticeName: "",
          notice: "",
        });
      } else {
        const errorResult = await response.json();
        console.error("Error:", errorResult);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchNotices = async () => {
    const token = localStorage.getItem("authToken");
    try {
      const response = await fetch(
        `${import.meta.env.REACT_APP_BASE_URL}/api/other/get-notice`,
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
        setNotices(result.notices);
      } else {
        const errorResult = await response.json();
        console.error("Error fetching notices:", errorResult);
      }
    } catch (error) {
      console.error("Error fetching notices:", error);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  console.log(noticeToUpdate?.publish_date.split("T")[0])

  const handleDelete = async (id) => {
    const token = localStorage.getItem("authToken");
    try {
      const response = await fetch(
        `${import.meta.env.REACT_APP_BASE_URL}/api/other/delete-notice`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ id }),
        }
      );

      if (response.ok) {
        console.log("Notice deleted successfully");
        await fetchNotices();
      } else {
        const errorResult = await response.json();
        console.error("Error deleting notice:", errorResult);
      }
    } catch (error) {
      console.error("Error deleting notice:", error);
    }
  };

  const handleDeleteConfirmation = (id) => {
    Swal.fire({
      title: "আপনি কি নিশ্চিত?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "হ্যাঁ, নিশ্চিত",
      cancelButtonText: "না",
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete(id);
        Swal.fire({
          title: "ডিলিট করা হয়েছে",
          text: "নোটিশ ডিলিট সম্পন্ন",
          icon: "success",
        });
      }
    });
  };

  const handleUpdate = async () => {
    const token = localStorage.getItem("authToken");
    const { id, publish_date, notice_name, notice_description } =
      noticeToUpdate;

    try {
      const response = await fetch(
        `${import.meta.env.REACT_APP_BASE_URL}/api/other/update-notice`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            id,
            publish_date,
            notice_name,
            notice_description,
          }),
        }
      );

      if (response.ok) {
        const result = await response.json();
        console.log("Updated notice:", result);
        fetchNotices(); // Fetch updated notices
        setShowUpdateModal(false); // Close the modal
      } else {
        const errorResult = await response.json();
        console.error("Error updating notice:", errorResult);
      }
    } catch (error) {
      console.error("Error updating notice:", error);
    }
  };

  console.log(noticeToUpdate);
  return (
    <div>
      <Header title={"নোটিশ"} />
      <div style={{ display: "flex", marginTop: "50px" }}>
        {/* Left Section */}
        <form
          onSubmit={handleSubmit}
          style={{
            width: "30%",
            height: "700px",
            padding: "20px",
            borderRight: "1px solid #ddd",
          }}
        >
          <div className="col-md-12 d-flex flex-column mb-3">
            <label className="mb-2 text-[16px]">তারিখ</label>
            <input
              type="date"
              className="form-control"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              aria-label="Select date"
              style={{ borderRadius: "5px" }}
            />
          </div>
          <div className="col-md-12 d-flex flex-column mb-3">
            <label className="mb-2 text-[16px]">নোটিশের নাম</label>
            <textarea
              className="form-control"
              name="noticeName"
              value={formData.noticeName}
              onChange={handleInputChange}
              aria-label="Enter notice"
              placeholder="নোটিশের নাম লিখুন"
              style={{
                borderRadius: "5px",
                height: "80px",
                resize: "none",
                paddingTop: "10px",
              }}
            />
          </div>
          <div className="col-md-12 d-flex flex-column mb-3">
            <label className="mb-2 text-[16px]">নোটিশ</label>
            <textarea
              className="form-control"
              name="notice"
              value={formData.notice}
              onChange={handleInputChange}
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
            type="submit"
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
        </form>

        {/* Right Section */}
        <div
          style={{
            width: "70%",
            height: "700px",
            padding: "20px",
            overflowY: "auto",
            maxHeight: "80vh",
          }}
        >
          <h4 style={{ marginBottom: "20px" }}>পূর্বের নোটিশ</h4>
          {notices.map((card, index) => (
            <div
              key={index}
              style={{
                border: "1px solid #ddd",
                borderRadius: "5px",
                marginBottom: "10px",
                backgroundColor: "#fff",
              }}
            >
              <div style={{ display: "flex" }}>
                <div
                  style={{
                    backgroundColor: "#E7E6F2",
                    color: "#857CBC",
                    paddingTop: "10px",
                    paddingRight: "15px",
                    paddingLeft: "15px",
                    justifyContent: "center",
                    alignItems: "center",
                    display: "flex",
                  }}
                >
                  <FaClipboardList size={25} fill="#13007D" />
                </div>
                <div
                  style={{
                    padding: "10px",
                    position: "relative",
                    width: "100%",
                  }}
                >
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <p>
                      {new Date(card.publish_date).toLocaleDateString("bn-BD", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                    <div>
                      <span style={{ cursor: "pointer", marginRight: "10px" }}>
                        <MdDelete
                          size={20}
                          onClick={() => handleDeleteConfirmation(card.id)}
                        />
                      </span>
                      <span style={{ cursor: "pointer" }}>
                        <FaEdit
                          size={20}
                          onClick={() => {
                            setNoticeToUpdate(card);
                            setShowUpdateModal(true);
                          }}
                        />
                      </span>
                    </div>
                  </div>
                  <p style={{ fontWeight: "600" }}>{card.notice_name}</p>
                  <p>{card.notice_description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Update Modal */}
      <Modal show={showUpdateModal} onHide={() => setShowUpdateModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>নোটিশ আপডেট করুন</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <label className="form-label">তারিখ</label>
            <input
              type="date"
              className="form-control"
              name="date"
              value={
                noticeToUpdate?.publish_date
                  ? noticeToUpdate?.publish_date.split("T")[0]
                  : ""
              }
              onChange={(e) =>
                setNoticeToUpdate({
                  ...noticeToUpdate,
                  publish_date: e.target.value,
                })
              }
            />
          </div>

          <div className="mb-3">
            <label className="form-label">নোটিশের নাম</label>
            <input
              type="text"
              className="form-control"
              name="noticeName"
              value={noticeToUpdate?.notice_name}
              onChange={(e) =>
                setNoticeToUpdate({
                  ...noticeToUpdate,
                  notice_name: e.target.value,
                })
              }
            />
          </div>

          <div className="mb-3">
            <label className="form-label">নোটিশ</label>
            <textarea
              className="form-control"
              style={{ height: "300px" }}
              name="notice"
              value={noticeToUpdate?.notice_description}
              onChange={(e) =>
                setNoticeToUpdate({
                  ...noticeToUpdate,
                  notice_description: e.target.value,
                })
              }
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowUpdateModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Notice;
