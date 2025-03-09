<div
  className="modal fade"
  id="updateModal"
  tabIndex="-1"
  aria-labelledby="updateModalLabel"
  aria-hidden="true"
>
  <div
    className="modal-dialog modal-dialog-centered modal-dialog-scrollable"
    style={{
      width: "90%",
      height: "70%",
      maxHeight: "90vh",
      maxWidth: "70vw",
      marginLeft: "auto",
      marginRight: "auto",
    }}
  >
    <div className="modal-content" style={{ padding: "30px" }}>
      <div className="modal-header">
        <h5 className="modal-title" id="updateModalLabel">
          কর্মকর্তা তথ্য আপডেট করুন
        </h5>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
        ></button>
      </div>

      <div className="filter mb-4" style={{ margin: "26px" }}>
        {/* Your form content */}
      </div>

      <div
        className="modal-body"
        style={{
          maxHeight: "60vh",
          overflowY: "auto",
        }}
      >
        <form onSubmit={handleUpdateFormSubmit}>
          {/* Your form fields */}
        </form>
      </div>
    </div>
  </div>
</div>
