import * as XLSX from "xlsx";
import Papa from "papaparse";
import { useState } from "react";

const YourComponent = () => {
  const [uploadedData, setUploadedData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setLoading(true); // Show loading spinner
      setError(null); // Reset error
      if (file.type === "text/csv") {
        // Handle CSV file
        parseCsvFile(file);
      } else if (
        file.type === "application/vnd.ms-excel" ||
        file.type ===
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      ) {
        // Handle Excel file
        parseExcelFile(file);
      } else {
        setLoading(false); // Hide loading spinner
        setError("Please upload a valid CSV or Excel file.");
      }
    }
  };

  const parseCsvFile = (file) => {
    Papa.parse(file, {
      complete: (result) => {
        console.log("CSV data:", result);
        if (result.data.length === 0) {
          setLoading(false); // Hide loading spinner
          setError("No data found in the CSV file.");
        } else {
          setUploadedData(result.data); // Set the uploaded data to state
          setLoading(false); // Hide loading spinner
        }
      },
      header: true,
    });
  };

  const parseExcelFile = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0]; // Get the first sheet
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet); // Convert sheet to JSON
      console.log("Excel data:", jsonData);
      if (jsonData.length === 0) {
        setLoading(false); // Hide loading spinner
        setError("No data found in the Excel file.");
      } else {
        setUploadedData(jsonData); // Set the uploaded data to state
        setLoading(false); // Hide loading spinner
      }
    };
    reader.readAsArrayBuffer(file); // Read the file as an array buffer
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      
      {/* Loading Spinner */}
      {loading && <div>Loading...</div>}

      {/* Error Message */}
      {error && <div style={{ color: "red" }}>{error}</div>}

      {/* Table to display data */}
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Emp ID</th>
            <th>Name</th>
            <th>Mobile</th>
            <th>NID</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {uploadedData.length > 0 ? (
            uploadedData.map((row, index) => (
              <tr key={index}>
                <td>{row["Emp ID"]}</td>
                <td>{row["Name"]}</td>
                <td>{row["Mobile"]}</td>
                <td>{row["NID"]}</td>
                <td>{row["Address"]}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No data uploaded</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default YourComponent;
