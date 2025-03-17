import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../Header";
import { useParams } from "react-router-dom";

const PermissionManagement = () => {
  const [loading, setLoading] = useState(true);
  const { role_id } = useParams();
  console.log(role_id);
 
  const [roleData, setRoleData] = useState({
    roleId: 2,
    roleName: "admin",
    create_privilege: "",
    read_privilege: "",
    edit_privilege: "",
    delete_privilege: "",
    page: [
      {
        pageName: "home page",
        pageRoute: "pages/homepage",
        create_privilege: false,
        read_privilege: false,
        edit_privilege: false,
        delete_privilege: false,
      },
      {
        pageName: "about page demo",
        pageRoute: "pages/about",
        create_privilege: false,
        read_privilege: false,
        edit_privilege: false,
        delete_privilege: false,
      },
    ],
  });

 
  const fetchData = async () => {
    const token = localStorage.getItem("authToken");
    try {
      const response = await fetch(
        `${
          import.meta.env.REACT_APP_BASE_URL
        }/api/setup/get-Role-With-Privileges`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            role_id: role_id,
          }),
        }
      );

      if (response.ok) {
        const result = await response.json();
        setRoleData(result);
        setLoading(false);
      } else {
        const errorResult = await response.json();
        console.error("Error fetching all role:", errorResult);
      }
    } catch (error) {
      console.error("Error fetching all role:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const updateTopLevelPrivileges = (updatedPages) => {
    
    let createPrivileges = "";
    let readPrivileges = "";
    let editPrivileges = "";
    let deletePrivileges = "";

    
    updatedPages.forEach((page) => {
      if (page.create_privilege) createPrivileges += page.pageRoute + ",";
      if (page.read_privilege) readPrivileges += page.pageRoute + ",";
      if (page.edit_privilege) editPrivileges += page.pageRoute + ",";
      if (page.delete_privilege) deletePrivileges += page.pageRoute + ",";
    });

    
    createPrivileges = createPrivileges.slice(0, -1);
    readPrivileges = readPrivileges.slice(0, -1);
    editPrivileges = editPrivileges.slice(0, -1);
    deletePrivileges = deletePrivileges.slice(0, -1);

    
    return {
      create_privilege: createPrivileges,
      read_privilege: readPrivileges,
      edit_privilege: editPrivileges,
      delete_privilege: deletePrivileges,
    };
  };

  
  const handleCheckboxChange = (pageIndex, privilege, checked) => {
    setRoleData((prevData) => {
      
      const updatedPages = [...prevData.page];
      updatedPages[pageIndex] = {
        ...updatedPages[pageIndex],
        [privilege]: checked,
      };

   
      const topLevelPrivileges = updateTopLevelPrivileges(updatedPages);

      return {
        ...prevData,
        ...topLevelPrivileges,
        page: updatedPages,
      };
    });
  };

  //   ******************** array structure*************************
  // const updateTopLevelPrivileges = (updatedPages) => {
  //     // Initialize arrays to hold page routes for each privilege
  //     const createPrivileges = []
  //     const readPrivileges = []
  //     const editPrivileges = []
  //     const deletePrivileges = []

  //     // Collect page routes for each privilege type
  //     updatedPages.forEach((page) => {
  //       if (page.create_privilege) createPrivileges.push(page.pageRoute)
  //       if (page.read_privilege) readPrivileges.push(page.pageRoute)
  //       if (page.edit_privilege) editPrivileges.push(page.pageRoute)
  //       if (page.delete_privilege) deletePrivileges.push(page.pageRoute)
  //     })

  //     // Convert arrays to JSON strings
  //     return {
  //       create_privilege: JSON.stringify(createPrivileges),
  //       read_privilege: JSON.stringify(readPrivileges),
  //       edit_privilege: JSON.stringify(editPrivileges),
  //       delete_privilege: JSON.stringify(deletePrivileges),
  //     }
  //   }

  //   // Handle checkbox changes
  //   const handleCheckboxChange = (pageIndex, privilege, checked) => {
  //     setRoleData((prevData) => {
  //       // Update the specific page's privilege
  //       const updatedPages = [...prevData.page]
  //       updatedPages[pageIndex] = {
  //         ...updatedPages[pageIndex],
  //         [privilege]: checked,
  //       }

  //       // Update top-level privileges
  //       const topLevelPrivileges = updateTopLevelPrivileges(updatedPages)

  //       return {
  //         ...prevData,
  //         ...topLevelPrivileges,
  //         page: updatedPages,
  //       }
  //     })
  //   }

  const handleUpdate = async () => {
    console.log("Updated role data:", roleData);
    const {
      create_privilege,
      delete_privilege,
      edit_privilege,
      roleId,
      roleName,
      read_privilege,
    } = roleData;

    const requestBody = {
      create_privilege,
      delete_privilege,
      edit_privilege,
      role_id: roleId,
      role: roleName,
      read_privilege,
    };

    console.log(requestBody);

    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `${import.meta.env.REACT_APP_BASE_URL}/api/role/update-role`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(requestBody),
        }
      );
      const result = await response.json();

      if (response.ok) {
        console.log("update role successfully");
        fetchData();
      } else {
        alert(result.message || "Error updating work field");
      }
    } catch (error) {
      console.error("Error updating work field:", error);
      alert("Something went wrong. Please try again.");
    }
  };
  console.log(roleData);

  if (loading)
    return <div className="container mt-5 text-center">Loading...</div>;

  return (
    <div>
      <Header title={"রোল"} />
      <div
        className="dashboard p-3"
        style={{ backgroundColor: "#FFFFFF", borderRadius: "15px" }}
      >
        <div className="filter mb-4" style={{ margin: "26px" }}>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th style={{ width: "20%" }}>রোল</th>
                <th style={{ width: "20%" }}>মডিউলের নাম</th>
                <th style={{ width: "60%" }}>
                  <div className="row text-center">
                    <div className="col-3">Add</div>
                    <div className="col-3">View</div>
                    <div className="col-3">Edit</div>
                    <div className="col-3">Delete</div>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {roleData.page.map((page, pageIndex) => (
                <tr key={page.pageRoute}>
                  {pageIndex === 0 && (
                    <td rowSpan={roleData.page.length} className="align-middle">
                      {roleData.roleName}
                    </td>
                  )}
                  <td>{page.pageName}</td>
                  <td>
                    <div className="row text-center">
                      <div className="col-3">
                        <input
                          type="checkbox"
                          checked={page.create_privilege}
                          onChange={(e) =>
                            handleCheckboxChange(
                              pageIndex,
                              "create_privilege",
                              e.target.checked
                            )
                          }
                        />
                      </div>
                      <div className="col-3">
                        <input
                          type="checkbox"
                          checked={page.read_privilege}
                          onChange={(e) =>
                            handleCheckboxChange(
                              pageIndex,
                              "read_privilege",
                              e.target.checked
                            )
                          }
                        />
                      </div>
                      <div className="col-3">
                        <input
                          type="checkbox"
                          checked={page.edit_privilege}
                          onChange={(e) =>
                            handleCheckboxChange(
                              pageIndex,
                              "edit_privilege",
                              e.target.checked
                            )
                          }
                        />
                      </div>
                      <div className="col-3">
                        <input
                          type="checkbox"
                          checked={page.delete_privilege}
                          onChange={(e) =>
                            handleCheckboxChange(
                              pageIndex,
                              "delete_privilege",
                              e.target.checked
                            )
                          }
                        />
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="d-flex justify-content-end mt-3">
            <button
              className="btn btn-primary"
              style={{
                backgroundColor: "#1a0080",
                borderColor: "#1a0080",
                padding: "10px 30px",
              }}
              onClick={handleUpdate}
            >
              আপডেট করুন
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PermissionManagement;
