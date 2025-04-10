<div
  style={{
    width: "70%",
    maxHeight: "80vh", // Ensure the height is constrained to a portion of the viewport
    padding: "20px",
    overflowY: "auto", // Allow vertical scrolling if content overflows
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
        padding: "10px",
        overflow: "hidden", // Prevents overflow inside the card, keeping it clean
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
          <div style={{ display: "flex", justifyContent: "space-between" }}>
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
                    handleEdit(card);
                  }}
                />
              </span>
            </div>
          </div>
          <p style={{ fontWeight: "600" }}>
            {card.notice_name}
          </p>
          <p style={{
            wordWrap: "break-word", // Allows text to wrap to the next line when it overflows
            overflowWrap: "break-word", // Additional property for ensuring text wraps when necessary
          }}>
            {card?.notice_description?.slice(0, 350) + "....."}{" "}
            <span
              data-bs-toggle="modal"
              data-bs-target="#updateModal"
              onClick={() => setNoticeToUpdate(card)}
              style={{ cursor: "pointer", color: "blue" }}
            >
              আরো পড়ুন
            </span>
          </p>
        </div>
      </div>
    </div>
  ))}
</div>
