import React, { useState } from "react";
import axios from "axios";

const EmployeeRegister = () => {
  const [empCode, setEmpCode] = useState("");
  const [result, setResult] = useState(null);

  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://localhost/Employees.php", {
        emp_no: empCode,
      });
      setResult(response.data);
    } catch (error) {
      console.log("Error al llamar al endpoint:", error);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Código de empleado"
        value={empCode}
        onChange={(e) => setEmpCode(e.target.value)}
      />
      <button onClick={handleSubmit}>Registrar</button>

      {result && (
        <div>
          <p>Nombre: {result.emp_name}</p>
          <p>Hora de Registro: {result.time_recorded}</p>
          <p>Mensaje: {result.message}</p>
          <p>Código de Estado: {result.status_code}</p>
        </div>
      )}
    </div>
  );
};

export default EmployeeRegister;




// DELIMITER //
// CREATE PROCEDURE RegisterEmployee(
//     IN empCode INT,
//     OUT emp_name VARCHAR(50),
//     OUT time_recorded TIMESTAMP,
//     OUT message VARCHAR(100),
//     OUT status_code INT
// )
// BEGIN
//     DECLARE EXIT HANDLER FOR 1452
//     BEGIN
//         SET time_recorded = NOW();
//         SET message = CONCAT('Error, codigo de empleado ', empCode, ' no existe');
//         SET status_code = -1;
//         INSERT INTO marcaje_error (emp_no, timestamp) VALUES (empCode, NOW());
//     END;

//     SELECT first_name INTO emp_name FROM employees WHERE emp_no = empCode;
//     SET time_recorded = NOW();
//     SET message = 'Empleado registrado exitosamente';
//     SET status_code = 1;

//     INSERT INTO marcaje (emp_no, timestamp) VALUES (empCode, NOW());
// END;
// //
// DELIMITER ;



// CREATE TABLE marcaje (
//     id INT PRIMARY KEY AUTO_INCREMENT,
//     emp_no INT,
//     timestamp DATETIME,
//     FOREIGN KEY (emp_no) REFERENCES employees(emp_no)
// );

// CREATE TABLE marcaje_error (
//     id INT PRIMARY KEY AUTO_INCREMENT,
//     emp_no INT,
//     timestamp DATETIME
// );



// trigger para registrar cada vez que se añade un nuevo salario en la tabla "salaries", after_salary_insert