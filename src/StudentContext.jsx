import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const StudentContext = createContext();

const StudentProvider = ({ children }) => {
  const [students, setStudents] = useState([]);
  const [totalStudents, setTotalStudents] = useState(0);

  // Base URL for CRUD CRUD API
  const baseURL =
    "https://crudcrud.com/api/45c38c6c284f48a786b77feb3a11ce9d/students";

  // Load initial student data from API
  useEffect(() => {
    fetchData();
  }, []);

  // Fetch student data from API
  const fetchData = async () => {
    try {
      const response = await axios.get(baseURL);
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Update totalStudents whenever there is a change in students array
  useEffect(() => {
    setTotalStudents(students.length);
  }, [students]);

  // Add student to API
  const addStudent = async (student) => {
    try {
      const response = await axios.post(baseURL, student);
      setStudents([...students, response.data]);
    } catch (error) {
      console.error("Error adding student:", error);
    }
  };

  // Delete student from API
  const deleteStudent = async (_id) => {
    try {
      await axios.delete(`${baseURL}/${_id}`);
      setStudents(students.filter((student) => student._id !== _id));
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  // Edit student in API
  const editStudent = async (updatedStudent) => {
    try {
      const { _id, id, name, address } = updatedStudent;
      const response = await axios.put(`${baseURL}/${_id}`, {
        id,
        name,
        address,
      });
      const updatedStudents = students.map((student) =>
        student._id === id ? response.data : student
      );
      setStudents(updatedStudents);
      window.location.reload();
    } catch (error) {
      console.error("Error editing student:", error);
    }
  };

  return (
    <StudentContext.Provider
      value={{
        students,
        addStudent,
        deleteStudent,
        editStudent,
        totalStudents,
      }}
    >
      {children}
    </StudentContext.Provider>
  );
};

export default StudentProvider;
