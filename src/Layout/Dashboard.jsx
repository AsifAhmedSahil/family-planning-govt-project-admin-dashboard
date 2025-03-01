import { Container, Row, Col, Nav } from "react-bootstrap";
import { NavLink, Outlet } from "react-router-dom";

import logo from "../assets/logo.png";
// import SettingsPage from "../pages/SettingsPage";
import { MdOutlineDashboard } from "react-icons/md";
import { MdOutlineCoPresent } from "react-icons/md";
import { BsFillPeopleFill } from "react-icons/bs";
import { FaPersonCircleMinus } from "react-icons/fa6";
import { IoSettingsOutline } from "react-icons/io5";
import { Dropdown } from "react-bootstrap"; // Import the Dropdown component from react-bootstrap

const Dashboard = () => {
  return (
    <div>
      {/* Main Container */}
      <Container fluid style={{backgroundColor:"#F6F6F6"}}>
        <Row>
          {/* Sidebar */}
          <Col
            xs={3}
            className="bg-[#FFFFFF] p-3"
            style={{ height: "100vh", width: "17%" ,backgroundColor:"#FFFFFF"}}
          >
            <div className="container-fluid d-flex  align-items-center justify-content-center py-3 ">
              <div className="logo w">
                <img
                  src={logo}
                  alt="logo"
                  style={{ width: "65px", height: "65px" }}
                />
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
                className="nav-link d-flex flex-row gap-2 align-items-center justify-content-start h-100 w-100 rounded-lg  text-center p-2 transition-transform transform  text-black ms-5 gap-3"
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
              <NavLink
                to="/attendence"
                className="nav-link d-flex flex-row gap-2 align-items-center justify-content-start h-100 w-100 m-2 rounded-lg  text-center p-2 transition-transform transform  text-black ms-5 gap-3"
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
              <NavLink
                to="/peopleInformation"
                className="nav-link d-flex flex-row gap-2 align-items-center justify-content-start h-100 w-100 m-2 rounded-lg  text-center p-2 transition-transform transform  text-black ms-5 gap-3"
              >
                <div>
                  <BsFillPeopleFill
                    className="mb-2"
                    style={{ fontSize: "1.5rem" }}
                  />
                </div>
                <span
                  className="d-none d-lg-block text-xs lg:text-lg font-weight-semibold bg-transparent"
                  style={{ fontSize: "18px" }}
                >
                  কর্মকর্তার তথ্য
                </span>
              </NavLink>
              <NavLink
                to="/leave"
                className="nav-link d-flex flex-row gap-2 align-items-center justify-content-start h-100 w-100 m-2 rounded-lg  text-center p-2 transition-transform transform  text-black ms-5 gap-3"
              >
                <div>
                  <FaPersonCircleMinus
                    className="mb-2"
                    style={{ fontSize: "1.5rem" }}
                  />
                </div>
                <span
                  className="d-none d-lg-block text-xs lg:text-lg font-weight-semibold bg-transparent"
                  style={{ fontSize: "18px" }}
                >
                  ছুটি
                </span>
              </NavLink>

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
                  <Dropdown.Item href="/setting/overview">
                    ওভারভিউ
                  </Dropdown.Item>
                  <Dropdown.Item href="/setting/subunion" className="mt-2">
                    উপজেলা
                  </Dropdown.Item>
                  <Dropdown.Item href="/setting/union" className="mt-2">
                    ইউনিয়ন
                  </Dropdown.Item>
                  <Dropdown.Item href="/setting/unit" className="mt-2">
                    ইউনিট
                  </Dropdown.Item>
                  <Dropdown.Item href="/setting/designation" className="mt-2">
                    পদবী
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav>
          </Col>

          {/* Main Content */}
          <Col xs={9} className="p-4" style={{ width: "83%" }}>
            <Outlet />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Dashboard;
