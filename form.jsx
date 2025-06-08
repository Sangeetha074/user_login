import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Form = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    course: "",
    semester:"",
    cgpa:"",
    
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const Navigate=useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    let newErrors = { ...errors };

    if (name === "name") {
      if (!/^[a-zA-Z\s]*$/.test(value)) {
        return; // Prevent invalid input
      }
      newErrors.name = value.trim() ? "" : "Name is required";
    }

    if (name === "phone") {
      if (!/^\d{0,10}$/.test(value)) {
        return; // Prevent non-numeric input and limit to 10 digits
      }
      newErrors.phone = value.length === 10 ? "" : "Phone number must be 10 digits";
    }
    if (name === "cgpa") {
        if (!/^\d*\.?\d*$/.test(value)) {
          return; // Prevent non-numeric input
        }
        if (parseFloat(value) > 10) {
          newErrors.cgpa = "CGPA cannot exceed 10";
        } else {
          newErrors.cgpa = "";
        }
      }

    setFormData({ ...formData, [name]: value });
    setErrors(newErrors);
  };

  const validateForm = () => {
    let newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (!/^[a-zA-Z\s]+$/.test(formData.name)) {
      newErrors.name = "Name can only contain alphabets and spaces";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be exactly 10 digits";
    }

    if (!formData.dob.trim()) {
      newErrors.dob = "Date of birth is required";
    }

    if (!formData.gender.trim()) {
      newErrors.gender = "Gender is required";
    }

    if (!formData.course.trim()) {
      newErrors.course = "Course selection is required";
    }
    if (!formData.semester.trim()) {
        newErrors.semester = "Semester selection is required";
      }
  
      if (!formData.cgpa.trim()) {
        newErrors.cgpa = "CGPA is required";
      } else if (parseFloat(formData.cgpa) < 0 || parseFloat(formData.cgpa) > 10) {
        newErrors.cgpa = "CGPA must be between 0 and 10";
      }
    

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {  
    e.preventDefault();  
  
    if (validateForm()) {  
      setMessage("Submitting...");

      try {
        const response = await axios.post('https://student-login-1.onrender.com/stform', {
          Name: formData.name,
          email: formData.email,
          phone: formData.phone.toString(),
          dob: formData.dob,
          gender: formData.gender,
          Department: formData.course,
          Semester: parseInt(formData.semester,10),
          CGPA: parseFloat(formData.cgpa)
        });
        setMessage("Registration Successful!");  
        setFormData({ Name: "", email: "", phone: "", dob: "", gender: "", Department: "", Semester: "", CGPA: "" });
        Navigate('/RegisterForm');
      } catch (error) {
        setMessage("Error: " + error.response?.data?.detail || "Something went wrong");
      }
    } else {
      setMessage("");  
    }  
  };  

    

  return (
    <div className="container">
      <div className="form-box">
        <h2>Student Registration</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group4">
            <label>Full Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} />
            {errors.name && <p className="error">{errors.name}</p>}
          </div>

          <div className="input-group4">
            <label>Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>

          <div className="input-group4">
            <label>Phone Number</label>
            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} />
            {errors.phone && <p className="error">{errors.phone}</p>}
          </div>

          <div className="input-group4">
            <label>Date of Birth</label>
            <input type="date" name="dob" value={formData.dob} onChange={handleChange} />
            {errors.dob && <p className="error">{errors.dob}</p>}
          </div>

          <div className="input-group4">
            <label>Gender</label>
            <select name="gender" value={formData.gender} onChange={handleChange}>
              <option value="" disabled>Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {errors.gender && <p className="error">{errors.gender}</p>}
          </div>

          <div className="input-group4">
            <label>Course</label>
            <select name="course" value={formData.course} onChange={handleChange}>
              <option value="" disabled>Select course</option>
              <option value="cse">CSE</option>
              <option value="it">IT</option>
              <option value="ece">ECE</option>
              <option value="eee">EEE</option>
              <option value="mech">MECH</option>
            </select>
            {errors.course && <p className="error">{errors.course}</p>}
          </div>
          <div className="input-group4">
            <label>Semester</label>
            <select name="semester" value={formData.semester} onChange={handleChange}>
              <option value="" disabled>Select Semester</option>
              <option value="1">1st Semester</option>
              <option value="2">2nd Semester</option>
              <option value="3">3rd Semester</option>
              <option value="4">4th Semester</option>
              <option value="5">5th Semester</option>
              <option value="6">6th Semester</option>
              <option value="7">7th Semester</option>
              <option value="8">8th Semester</option>
            </select>
            {errors.semester && <p className="error">{errors.semester}</p>}
          </div>
          <div className="input-group4">
            <label>CGPA</label>
            <input type="text" name="cgpa" value={formData.cgpa} onChange={handleChange} />
            {errors.cgpa && <p className="error">{errors.cgpa}</p>}
          </div>
          

          <button className="button2" type="submit">Register</button>
        </form>

        {message && <p className="success">{message}</p>}
      </div>
    </div>
  );
};

export default Form;