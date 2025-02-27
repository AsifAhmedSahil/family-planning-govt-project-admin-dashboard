// src/App.jsx

import { Container, Row, Col, Nav } from "react-bootstrap";
import { FaTachometerAlt, FaCog, FaUsers } from "react-icons/fa";
import { Route, Link, Routes } from "react-router-dom";
import SettingsPage from "./pages/SettingsPage";
import logo from "./assets/logo.png";

// Pages (components for different routes)

const App = () => {
  return (
    <div>
      {/* Main Container */}
      <Container fluid>
        <Row>
          {/* Sidebar */}
          <Col xs={3} className="bg-light p-3" style={{ height: "100vh" }}>
            <div className="container-fluid d-flex  align-items-center justify-content-center py-3 ">
              <div className="logo w">
                <img
                  src={logo}
                  alt="logo"
                  style={{ width: "95px", height: "95px" }}
                />
              </div>
              <div className="">
                <h4 style={{ fontSize: "23px" }}>পরিবার পরিকল্পনা স্মার্ট</h4>
                <h4 style={{ fontSize: "23px" }}>মনিটরিং সিস্টেম</h4>
              </div>
            </div>

            <hr style={{color:"gray"}} />

            <Nav defaultActiveKey="/" className="flex-column">
              <Nav.Link as={Link} to="/">
                <FaTachometerAlt /> Dashboard
              </Nav.Link>
              <Nav.Link as={Link} to="/users">
                <FaUsers /> Users
              </Nav.Link>
              <Nav.Link as={Link} to="/settings">
                <FaCog /> Settings
              </Nav.Link>
            </Nav>
          </Col>

          {/* Main Content */}
          <Col xs={9} className="p-4">
            <Routes>
              {/* <Route exact path="/" component={DashboardPage} /> */}
              {/* <Route path="/users" component={UsersPage} /> */}
              <Route path="/settings" element={<SettingsPage />} />
            </Routes>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default App;
