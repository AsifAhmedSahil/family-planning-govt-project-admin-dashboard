"use client"

import { useState, useEffect } from "react"
import "bootstrap/dist/css/bootstrap.min.css"

export default function PermissionsManagement() {
  const [loading, setLoading] = useState(true)
  // State to hold the role data
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
  })

  // State for the dropdown and multi-value input
  const [selectedType, setSelectedType] = useState("")
  const [inputValue, setInputValue] = useState("")
  const [selectedValues, setSelectedValues] = useState([])

  // Fetch data on component mount
  useEffect(() => {
    // Simulating API fetch - replace with your actual API call
    const fetchData = async () => {
      try {
        // Replace with your actual API endpoint
        // const response = await fetch('/api/roles/2')
        // const data = await response.json()

        // Using sample data for demonstration
        const data = {
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
        }

        setRoleData(data)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching role data:", error)
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Update top-level privileges based on page privileges
  const updateTopLevelPrivileges = (updatedPages) => {
    // Initialize arrays to hold page routes for each privilege
    const createPrivileges = []
    const readPrivileges = []
    const editPrivileges = []
    const deletePrivileges = []

    // Collect page routes for each privilege type
    updatedPages.forEach((page) => {
      if (page.create_privilege) createPrivileges.push(page.pageRoute)
      if (page.read_privilege) readPrivileges.push(page.pageRoute)
      if (page.edit_privilege) editPrivileges.push(page.pageRoute)
      if (page.delete_privilege) deletePrivileges.push(page.pageRoute)
    })

    // Convert arrays to JSON strings
    return {
      create_privilege: JSON.stringify(createPrivileges),
      read_privilege: JSON.stringify(readPrivileges),
      edit_privilege: JSON.stringify(editPrivileges),
      delete_privilege: JSON.stringify(deletePrivileges),
    }
  }

  // Handle checkbox changes
  const handleCheckboxChange = (pageIndex, privilege, checked) => {
    setRoleData((prevData) => {
      // Update the specific page's privilege
      const updatedPages = [...prevData.page]
      updatedPages[pageIndex] = {
        ...updatedPages[pageIndex],
        [privilege]: checked,
      }

      // Update top-level privileges
      const topLevelPrivileges = updateTopLevelPrivileges(updatedPages)

      return {
        ...prevData,
        ...topLevelPrivileges,
        page: updatedPages,
      }
    })
  }

  // Handle type selection change
  const handleTypeChange = (e) => {
    setSelectedType(e.target.value)
    // Reset values when type changes
    setSelectedValues([])
    setInputValue("")
  }

  // Handle input change
  const handleInputChange = (e) => {
    setInputValue(e.target.value)
  }

  // Handle key press in input field
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      e.preventDefault() // Prevent form submission
      addValue(inputValue.trim())
      setInputValue("")
    }
  }

  // Add a value to the selected values
  const addValue = (value) => {
    if (!selectedValues.includes(value)) {
      setSelectedValues([...selectedValues, value])
    }
  }

  // Remove a value from the selected values
  const removeValue = (valueToRemove) => {
    setSelectedValues(selectedValues.filter((value) => value !== valueToRemove))
  }

  // Get comma-separated string of selected values
  const getValuesString = () => {
    return selectedValues.join(",")
  }

  // Handle update button click
  const handleUpdate = () => {
    const updatedData = {
      ...roleData,
      selectedType,
      customValues: selectedType === "custom" ? getValuesString() : "",
    }
    console.log("Updated role data:", updatedData)
    // You can add API call here to save the data
  }

  if (loading) return <div className="container mt-5 text-center">Loading...</div>

  return (
    <div className="container mt-4">
      <div className="card mb-4">
        <div className="card-body">
          <div className="row mb-3">
            <div className="col-md-4">
              <label htmlFor="typeSelect" className="form-label">
                Select Type
              </label>
              <select id="typeSelect" className="form-select" value={selectedType} onChange={handleTypeChange}>
                <option value="">Select a type...</option>
                <option value="users">Users</option>
                <option value="roles">Roles</option>
                <option value="permissions">Permissions</option>
                <option value="custom">Custom</option>
              </select>
            </div>
          </div>

          {selectedType === "custom" && (
            <div className="row">
              <div className="col-md-8">
                <label htmlFor="multiInput" className="form-label">
                  Add Multiple Values
                </label>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    id="multiInput"
                    className="form-control"
                    placeholder="Type and press Enter to add"
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                  />
                </div>

                <div className="selected-values mt-2">
                  {selectedValues.map((value, index) => (
                    <span key={index} className="badge bg-primary me-2 mb-2 p-2">
                      {value}
                      <button
                        type="button"
                        className="btn-close btn-close-white ms-2"
                        style={{ fontSize: "0.5rem" }}
                        onClick={() => removeValue(value)}
                        aria-label="Remove"
                      ></button>
                    </span>
                  ))}
                </div>

                {selectedValues.length > 0 && (
                  <div className="mt-3">
                    <strong>Values as string:</strong> {getValuesString()}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="card">
        <div className="card-body">
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
                          onChange={(e) => handleCheckboxChange(pageIndex, "create_privilege", e.target.checked)}
                        />
                      </div>
                      <div className="col-3">
                        <input
                          type="checkbox"
                          checked={page.read_privilege}
                          onChange={(e) => handleCheckboxChange(pageIndex, "read_privilege", e.target.checked)}
                        />
                      </div>
                      <div className="col-3">
                        <input
                          type="checkbox"
                          checked={page.edit_privilege}
                          onChange={(e) => handleCheckboxChange(pageIndex, "edit_privilege", e.target.checked)}
                        />
                      </div>
                      <div className="col-3">
                        <input
                          type="checkbox"
                          checked={page.delete_privilege}
                          onChange={(e) => handleCheckboxChange(pageIndex, "delete_privilege", e.target.checked)}
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
              style={{ backgroundColor: "#1a0080", borderColor: "#1a0080", padding: "10px 30px" }}
              onClick={handleUpdate}
            >
              আপডেট করুন
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

