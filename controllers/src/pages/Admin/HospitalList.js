import React, { useEffect, useState } from "react";
import Layout from "../../components/shared/Layout/Layout";
import moment from "moment";
import API from "../../services/API";
import "./HospitalList.css"; // Add a CSS file for styling

const HospitalList = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(5);
  const [loading, setLoading] = useState(false);

  // Fetch hospital records
  const getHospitals = async () => {
    setLoading(true);
    try {
      const { data } = await API.get("/admin/hospital-list");
      if (data?.success) {
        setData(data?.hospitalData);
        setFilteredData(data?.hospitalData);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getHospitals();
  }, []);

  // Handle Delete
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (!confirmDelete) return;
    try {
      const { data } = await API.delete(`/admin/delete-hospital/${id}`);
      alert(data?.message);
      setFilteredData(filteredData.filter((record) => record._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  // Search Hospitals
  const handleSearch = (event) => {
    const value = event.target.value;
    setSearch(value);
    const searchResult = data.filter(
      (record) =>
        record.hospitalName.toLowerCase().includes(value.toLowerCase()) ||
        record.email.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(searchResult);
  };

  // Sorting function
  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
    setFilteredData((prevData) => {
      return [...prevData].sort((a, b) => {
        if (a[key] < b[key]) return direction === "ascending" ? -1 : 1;
        if (a[key] > b[key]) return direction === "ascending" ? 1 : -1;
        return 0;
      });
    });
  };

  // Pagination
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredData.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );
  const totalPages = Math.ceil(filteredData.length / recordsPerPage);

  return (
    <Layout>
      <div className="hospital-list-container">
        <h2>Hospital List</h2>

        {/* Search Input */}
        <input
          type="text"
          value={search}
          onChange={handleSearch}
          placeholder="Search by name or email"
          className="search-input"
        />

        {/* Table */}
        {loading ? (
          <div className="spinner"></div>
        ) : (
          <table className="hospital-table">
            <thead>
              <tr>
                <th onClick={() => handleSort("hospitalName")}>Hospital Name</th>
                <th onClick={() => handleSort("email")}>Email</th>
                <th>Phone</th>
                <th onClick={() => handleSort("createdAt")}>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentRecords.map((record) => (
                <tr key={record._id}>
                  <td>{record.hospitalName}</td>
                  <td>{record.email}</td>
                  <td>{record.phone}</td>
                  <td>
                    {moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}
                  </td>
                  <td>
                    <button
                      className="btn-delete"
                      onClick={() => handleDelete(record._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Pagination */}
        <div className="pagination">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          <span>{`Page ${currentPage} of ${totalPages}`}</span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default HospitalList;
