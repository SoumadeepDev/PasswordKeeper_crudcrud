import { useContext, useState } from "react";
import { StudentContext } from "../StudentContext";

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [searchquery, setSearchquery] = useState("");

  const { students, addStudent, deleteStudent, editStudent, totalStudents } =
    useContext(StudentContext);

  const handleClose = () => {
    setShowModal(false);
    setEditMode(false);
    setEditId("");
    resetForm();
  };

  const handleShow = () => setShowModal(true);

  const handleAddStudent = () => {
    if (editMode) {
      const updatedStudent = {
        id: editId,
        _id: editId,
        name,
        address,
      };
      editStudent(updatedStudent);
      console.log("sending updatedStudent", updatedStudent);
    } else {
      const newStudent = {
        id: Math.random().toString(),
        name,
        address,
      };
      addStudent(newStudent);
    }
    handleClose();
  };

  const handleEdit = (_id) => {
    const studentToEdit = students.find((student) => student._id === _id);
    if (studentToEdit) {
      setEditMode(true);
      setEditId(studentToEdit._id);
      setName(studentToEdit.name);
      setAddress(studentToEdit.address);
      handleShow();
    }
  };

  const resetForm = () => {
    setName("");
    setAddress("");
  };

  // Filter students based on search query
  const filteredStudents = students.filter(
    (student) =>
      student.name &&
      student.name.toLowerCase().includes(searchquery.toLowerCase())
  );

  return (
    <div className="container">
      <h1>Password Keeper</h1>
      <p>Total Password: {totalStudents}</p>
      <label style={{ margin: "0 auto" }}>Search Title</label>
      <input
        type="text"
        value={searchquery}
        placeholder="Search Title Here..."
        onChange={(e) => setSearchquery(e.target.value)}
      />
      <button onClick={handleShow} className="addbtn">
        Add New Password
      </button>

      {filteredStudents.map((student) => (
        <div className="student-card" key={student._id}>
          <p>Title: {student.name}</p>
          <p>Password: {student.address}</p>
          <button onClick={() => handleEdit(student._id)}>Edit</button>
          <button onClick={() => deleteStudent(student._id)}>Delete</button>
        </div>
      ))}
      <div className={`modal ${showModal ? "active" : ""}`}>
        <div className="modal-content">
          <h2>{editMode ? "Edit Student" : "Add New Student"}</h2>
          <form>
            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
          </form>
          <button className="btn" onClick={handleAddStudent}>
            {editMode ? "Save Changes" : "Add"}
          </button>
          <button className="btn" onClick={handleClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
