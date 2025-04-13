import { Container, Row, Col, Nav } from "react-bootstrap";
import { Link, NavLink, Outlet } from "react-router-dom";

import logo from "../assets/logo.png";
// import SettingsPage from "../pages/SettingsPage";
import { MdOutlineDashboard } from "react-icons/md";
import { MdOutlineCoPresent } from "react-icons/md";
import { BsPeople } from "react-icons/bs";

import { IoSettingsOutline } from "react-icons/io5";
import { GrAnnounce } from "react-icons/gr";
import { Dropdown } from "react-bootstrap"; // Import the Dropdown component from react-bootstrap
import { MdOutlineAddHomeWork } from "react-icons/md";
import { useState } from "react";
import { useUser } from "../context/UserProvider";

const Dashboard = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const { user } = useUser();
  const readPrivileges = user?.read_privilege?.split(",") || [];
  const hasAccess = (route) => readPrivileges.includes(route);

  const handleMenuItemClick = (event, item) => {
    event.stopPropagation(); // Stop the event from propagating
    setSelectedItem(item);
  };
  return (
    <div>
      {/* Main Container */}
      <Container fluid style={{ backgroundColor: "#F6F6F6" }}>
        <Row>
          {/* Sidebar */}
          <Col
            xs={3}
            className="bg-[#FFFFFF] p-2"
            style={{
              height: "100vh",
              width: "17%",
              backgroundColor: "#FFFFFF",
            }}
          >
            <div className="container-fluid d-flex  align-items-center justify-content-center  mt-2 mb-2">
              <div className="logo w">
                <Link to={"/"}>
                  <img
                    src={logo}
                    alt="logo"
                    style={{ width: "65px", height: "65px" }}
                  />
                </Link>
              </div>
              <div className="">
                <h4 style={{ fontSize: "15px" }}>পরিবার পরিকল্পনা স্মার্ট</h4>
                <h4 style={{ fontSize: "15px" }}>মনিটরিং সিস্টেম</h4>
              </div>
            </div>

            <hr style={{ color: "gray" }} />

            <Nav defaultActiveKey="/" className="flex-column">
              <NavLink
                to="/"
                className="nav-link d-flex flex-row gap-2 align-items-center justify-content-start h-100 w-100 rounded-lg  text-center p-2 transition-transform transform  text-black ps-5 ms-1 gap-3"
                style={({ isActive }) => ({
                  backgroundColor: isActive ? "#D5D1E8" : "transparent",
                  color: isActive ? "#13007D" : "inherit",
                })}
              >
                <div>
                  <MdOutlineDashboard
                    className="mb-2"
                    style={{ fontSize: "1.5rem" }}
                  />
                </div>
                <span
                  className="d-none d-lg-block lg:text-lg font-weight-semibold bg-transparent"
                  style={{ fontSize: "18px" }}
                >
                  ড্যাসবোর্ড
                </span>
              </NavLink>

              {hasAccess("attendence") && (
                <NavLink
                  to="/attendence"
                  className="nav-link d-flex flex-row gap-2 align-items-center justify-content-start h-100 w-100 m-2 rounded-lg  text-center p-2 transition-transform transform  text-black ps-5 gap-3"
                  style={({ isActive }) => ({
                    backgroundColor: isActive ? "#D5D1E8" : "transparent",
                    color: isActive ? "#13007D" : "inherit",
                  })}
                >
                  <div>
                    <MdOutlineCoPresent
                      className="mb-2"
                      style={{ fontSize: "1.5rem" }}
                    />
                  </div>
                  <span
                    className="d-none d-lg-block text-xs lg:text-lg font-weight-semibold bg-transparent"
                    style={{ fontSize: "18px" }}
                  >
                    উপস্থিতি
                  </span>
                </NavLink>
              )}

              {hasAccess("worktypeshow") && (
                <NavLink
                  to="/worktypeshow"
                  className="nav-link d-flex flex-row gap-2 align-items-center justify-content-start h-100 w-100 m-2 rounded-lg  text-center p-2 transition-transform transform  text-black ps-5 gap-3"
                  style={({ isActive }) => ({
                    backgroundColor: isActive ? "#D5D1E8" : "transparent",
                    color: isActive ? "#13007D" : "inherit",
                  })}
                >
                  <div>
                    <MdOutlineAddHomeWork
                      className="mb-2"
                      style={{ fontSize: "1.5rem" }}
                    />
                  </div>
                  <span
                    className="d-none d-lg-block text-xs lg:text-lg font-weight-semibold bg-transparent"
                    style={{ fontSize: "18px" }}
                  >
                    কাজের ক্ষেত্র
                  </span>
                </NavLink>
              )}

              {hasAccess("peopleInformation") && (
                <NavLink
                  to="/peopleInformation"
                  className={({ isActive }) =>
                    isActive
                      ? "nav-link active d-flex flex-row gap-2 align-items-center justify-content-start h-100 w-100 m-2 rounded-lg text-center p-2 transition-transform transform text-black ps-5 gap-3"
                      : "nav-link d-flex flex-row gap-2 align-items-center justify-content-start h-100 w-100 m-2 rounded-lg text-center p-2 transition-transform transform text-black ms-5 gap-3"
                  }
                  style={({ isActive }) => ({
                    backgroundColor: isActive ? "#D5D1E8" : "transparent",
                    color: isActive ? "#13007D" : "inherit",
                  })}
                >
                  <div>
                    <BsPeople className="mb-2" style={{ fontSize: "1.5rem" }} />
                  </div>
                  <span
                    className="d-none d-lg-block text-xs lg:text-lg font-weight-semibold bg-transparent"
                    style={{ fontSize: "18px" }}
                  >
                    কর্মকর্তার তথ্য
                  </span>
                </NavLink>
              )}

              {hasAccess("notice") && (
                <NavLink
                  to="/notice"
                  className="nav-link d-flex flex-row gap-2 align-items-center justify-content-start h-100 w-100 m-2 rounded-lg  text-center p-2 transition-transform transform  text-black ps-5 gap-3 "
                  style={({ isActive }) => ({
                    backgroundColor: isActive ? "#D5D1E8" : "transparent",
                    color: isActive ? "#13007D" : "inherit",
                  })}
                >
                  <div>
                    <GrAnnounce
                      className="mb-2"
                      style={{ fontSize: "1.5rem" }}
                    />
                  </div>
                  <span
                    className="d-none d-lg-block text-xs lg:text-lg font-weight-semibold bg-transparent"
                    style={{ fontSize: "18px" }}
                  >
                    নোটিশ
                  </span>
                </NavLink>
              )}

              {/* Dropdown Menu (styled like NavLink) */}
              <Dropdown className="ms-5 ">
                <Dropdown.Toggle
                  as="a" // Change to 'a' tag to match NavLink
                  variant="link"
                  id="dropdownMenuButton"
                  className="nav-link d-flex flex-row gap-2 align-items-center justify-content-start h-100 w-100 rounded-lg text-center p-2 transition-transform transform text-black mb-3 border-0 " // Added `border-0` class
                >
                  {/* Icon for dropdown */}
                  <div>
                    <IoSettingsOutline
                      className="mb-2"
                      style={{ fontSize: "1.5rem" }}
                    />
                  </div>
                  <span
                    className="d-none d-lg-block text-xs lg:text-lg font-weight-semibold bg-transparent"
                    style={{ fontSize: "18px" }}
                  >
                    সেটিংস
                  </span>
                </Dropdown.Toggle>

                <Dropdown.Menu className="border-0  ms-5">
                  {" "}
                  {/* Added `border-0` class */}
                  <Dropdown.Item
                    as={Link}
                    to="/setting/overview"
                    onClick={(e) => handleMenuItemClick(e, "action-1")}
                    style={{
                      backgroundColor:
                        selectedItem === "action-1" ? "#D5D1E8" : "transparent", // Dark background if selected
                      color: selectedItem === "action-1" ? "black" : "inherit", // White text if selected
                    }}
                  >
                    ওভারভিউ
                  </Dropdown.Item>
                  {hasAccess("setting/subunion") && (
                    <Dropdown.Item
                      as={Link}
                      to="/setting/subunion"
                      onClick={(e) => handleMenuItemClick(e, "action-2")}
                      style={{
                        backgroundColor:
                          selectedItem === "action-2"
                            ? "#D5D1E8"
                            : "transparent", // Dark background if selected
                        color:
                          selectedItem === "action-2" ? "black" : "inherit", // White text if selected
                      }}
                      className="mt-2"
                    >
                      উপজেলা
                    </Dropdown.Item>
                  )}
                  {hasAccess("setting/union") && (
                    <Dropdown.Item
                      as={Link}
                      to="/setting/union"
                      onClick={(e) => handleMenuItemClick(e, "action-3")}
                      style={{
                        backgroundColor:
                          selectedItem === "action-3"
                            ? "#D5D1E8"
                            : "transparent", // Dark background if selected
                        color:
                          selectedItem === "action-3" ? "black" : "inherit", // White text if selected
                      }}
                      className="mt-2"
                    >
                      ইউনিয়ন
                    </Dropdown.Item>
                  )}
                  {hasAccess("setting/unit") && (
                    <Dropdown.Item
                      as={Link}
                      to="/setting/unit"
                      onClick={(e) => handleMenuItemClick(e, "action-4")}
                      style={{
                        backgroundColor:
                          selectedItem === "action-4"
                            ? "#D5D1E8"
                            : "transparent", // Dark background if selected
                        color:
                          selectedItem === "action-4" ? "black" : "inherit", // White text if selected
                      }}
                      className="mt-2"
                    >
                      ইউনিট
                    </Dropdown.Item>
                  )}
                  {hasAccess("setting/designation") && (
                    <Dropdown.Item
                      as={Link}
                      to="/setting/designation"
                      onClick={(e) => handleMenuItemClick(e, "action-5")}
                      style={{
                        backgroundColor:
                          selectedItem === "action-5"
                            ? "#D5D1E8"
                            : "transparent", // Dark background if selected
                        color:
                          selectedItem === "action-5" ? "black" : "inherit", // White text if selected
                      }}
                      className="mt-2"
                    >
                      পদবী
                    </Dropdown.Item>
                  )}
                  {hasAccess("setting/worktype") && (
                    <Dropdown.Item
                      as={Link}
                      to="/setting/worktype"
                      onClick={(e) => handleMenuItemClick(e, "action-6")}
                      style={{
                        backgroundColor:
                          selectedItem === "action-6"
                            ? "#D5D1E8"
                            : "transparent",
                        color:
                          selectedItem === "action-6" ? "black" : "inherit",
                      }}
                      className="mt-2"
                    >
                      কাজের ক্ষেত্র
                    </Dropdown.Item>
                  )}
                  {hasAccess("setting/worktypedetails") && (
                    <Dropdown.Item
                      as={Link}
                      to="/setting/worktypedetails"
                      onClick={(e) => handleMenuItemClick(e, "action-7")}
                      style={{
                        backgroundColor:
                          selectedItem === "action-7"
                            ? "#D5D1E8"
                            : "transparent", // Dark background if selected
                        color:
                          selectedItem === "action-7" ? "black" : "inherit", // White text if selected
                      }}
                      className="mt-2"
                    >
                      কাজের ক্ষেত্রের বিবরনী
                    </Dropdown.Item>
                  )}
                  {(user?.role === "Super Admin" ||
                    hasAccess("setting/previlage")) && (
                    <Dropdown.Item
                      as={Link}
                      to="/setting/previlage"
                      onClick={(e) => handleMenuItemClick(e, "action-8")}
                      style={{
                        backgroundColor:
                          selectedItem === "action-8"
                            ? "#D5D1E8"
                            : "transparent",
                        color:
                          selectedItem === "action-8" ? "black" : "inherit",
                      }}
                      className="mt-2"
                    >
                      প্রিভিলেজ
                    </Dropdown.Item>
                  )}
                  {hasAccess("setting/role") && (
                    <Dropdown.Item
                      as={Link}
                      to="/setting/role"
                      onClick={(e) => handleMenuItemClick(e, "action-9")}
                      style={{
                        backgroundColor:
                          selectedItem === "action-9"
                            ? "#D5D1E8"
                            : "transparent", // Dark background if selected
                        color:
                          selectedItem === "action-9" ? "black" : "inherit", // White text if selected
                      }}
                      className="mt-2"
                    >
                      রোল
                    </Dropdown.Item>
                  )}
                  {hasAccess("setting/registration") && (
                    <Dropdown.Item
                      as={Link}
                      to="/setting/registration"
                      onClick={(e) => handleMenuItemClick(e, "action-10")}
                      style={{
                        backgroundColor:
                          selectedItem === "action-10"
                            ? "#D5D1E8"
                            : "transparent", // Dark background if selected
                        color:
                          selectedItem === "action-10" ? "black" : "inherit", // White text if selected
                      }}
                      className="mt-2"
                    >
                      নিবন্ধন
                    </Dropdown.Item>
                  )}
                </Dropdown.Menu>
              </Dropdown>
            </Nav>
          </Col>

          {/* Main Content */}
          <Col xs={9} className="p-4 pt-2" style={{ width: "83%" }}>
            <Outlet />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Dashboard;
