import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const RegisterForm = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [semesterFilter, setSemesterFilter] = useState("");
  const [cgpaFilter, setCgpaFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const axiosConfig = {
    auth: {
      username: "Ram",
      password: "1234"
    }
  };

  const fetchUsersBySearch = async (query) => {
    try {
      const response = await axios.post(
        "https://student-login-1.onrender.com/search",
        { Search: query },
        axiosConfig
      );
      setFilteredUsers(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching users by search:", error);
    }
  };

  const fetchUsersByDepartment = async (department) => {
    try {
      const response = await axios.post(
        "https://student-login-1.onrender.com/dep",
        { Department: department },
        axiosConfig
      );
      setFilteredUsers(response.data);
    } catch (error) {
      console.error("Error fetching users by department:", error);
    }
  };

  const fetchUsersBySemester = async (Semester) => {
    try {
      const response = await axios.post(
        "https://student-login-1.onrender.com/sem",
        { Semester: String(Semester) },
        axiosConfig
      );
      setFilteredUsers(response.data);
    } catch (error) {
      console.error("Error fetching users by semester:", error);
    }
  };

  const fetchUsersByCgpa = async (CGPA) => {
    try {
      const response = await axios.post(
        "https://student-login-1.onrender.com/cgpa",
        { CGPA: parseFloat(CGPA) },
        axiosConfig
      );
      setFilteredUsers(response.data);
      console.log(response);
    } catch (error) {
      console.error("Error fetching users by CGPA:", error);
    }
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query) {
      fetchUsersBySearch(query);
    } else {
      setFilteredUsers([]);
    }
  };

  const handleCheckboxChange = (userId) => {
    setSelectedUsers((prevSelected) =>
      prevSelected.includes(userId)
        ? prevSelected.filter((id) => id !== userId)
        : [...prevSelected, userId]
    );
  };

  const deleteSelectedUsers = async () => {
    if (selectedUsers.length === 0) {
      alert("No users selected for deletion.");
      return;
    }

    try {
      await axios.delete("https://student-login-1.onrender.com/delete", {
        ...axiosConfig,
        data: { user_ids: selectedUsers },
      });

      setFilteredUsers((prevUsers) =>
        prevUsers.filter((user) => !selectedUsers.includes(user.email))
      );
      setSelectedUsers([]);
      alert("Users deleted successfully.");
    } catch (error) {
      console.error("Error deleting users:", error);
      alert("Failed to delete users.");
    }
  };

  useEffect(() => {
    if (!departmentFilter && !semesterFilter && !cgpaFilter) {
      fetchUsersBySearch("");
    } else if (departmentFilter) {
      fetchUsersByDepartment(departmentFilter);
    } else if (semesterFilter) {
      fetchUsersBySemester(semesterFilter);
    } else if (cgpaFilter) {
      fetchUsersByCgpa(cgpaFilter);
    }
  }, [departmentFilter, semesterFilter, cgpaFilter]);

  const filteredAndSortedUsers = Array.isArray(filteredUsers)
    ? filteredUsers.sort((a, b) =>
        sortOrder === "asc"
          ? a.Name.localeCompare(b.Name)
          : b.Name.localeCompare(a.Name)
      )
    : [];

  return (
    <div className="register">
      <h2>All Users</h2>

      <input
        className="input1"
        type="text"
        placeholder="Search by any field"
        value={searchQuery}
        onChange={handleSearchChange}
      />

      <div className="filters-container">
        <label>Filter by Department:</label>
        <select
          className="select2"
          value={departmentFilter}
          onChange={(e) =>
            setDepartmentFilter(e.target.value === "All" ? "" : e.target.value)
          }
        >
          <option value="All">All</option>
          <option value="IT">IT</option>
          <option value="CSE">CSE</option>
          <option value="ECE">ECE</option>
          <option value="MECH">MECH</option>
        </select>

        <label>Filter by Semester:</label>
        <select
          className="select2"
          value={semesterFilter}
          onChange={(e) => setSemesterFilter(e.target.value)}
        >
          <option value="">All</option>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
            <option key={sem} value={sem}>
              {sem}
            </option>
          ))}
        </select>

        <label>Filter by CGPA:</label>
        <input
          className="input2"
          type="number"
          step="0.1"
          placeholder="Enter CGPA"
          value={cgpaFilter}
          onChange={(e) => setCgpaFilter(e.target.value)}
        />
      </div>

      <button
        className="button4"
        onClick={() =>
          setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"))
        }
      >
        Sort by Name ({sortOrder === "asc" ? "Ascending" : "Descending"})
      </button>
      <br />
      <button className="button4" onClick={deleteSelectedUsers}>
        Delete
      </button>

      <table border="1">
        <thead>
          <tr>
            <th>SELECT</th>
            <th>SNO</th>
            <th>Name</th>
            <th>Email</th>
            <th>Semester</th>
            <th>CGPA</th>
            <th>Department</th>
            <th>Phone</th>
            <th>Gender</th>
            <th>DOB</th>
          </tr>
        </thead>
        <tbody>
          {filteredAndSortedUsers.length > 0 ? (
            filteredAndSortedUsers.map((user, index) => (
              <tr key={index}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedUsers.includes(user.email)}
                    onChange={() => handleCheckboxChange(user.email)}
                  />
                </td>
                <td>{index + 1}</td>
                <td>{user.Name}</td>
                <td>{user.email}</td>
                <td>{user.Semester}</td>
                <td>{user.CGPA}</td>
                <td>{user.Department}</td>
                <td>{user.phone}</td>
                <td>{user.gender}</td>
                <td>{user.dob}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="10">No users found</td>
            </tr>
          )}
        </tbody>
      </table>

      <Link to="/">Back</Link>
    </div>
  );
};

export default RegisterForm;