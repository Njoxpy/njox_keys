// EmployeeInfo.jsx
import React from "react";

const EmployeeInfo = ({ employee }) => {
  return (
    <section className="bg-slate-50 p-6 rounded-lg shadow-inner">
      <h3 className="text-lg font-semibold mb-3">Employee Information</h3>
      <p>
        <span className="font-semibold">Name:</span> {employee.name}
      </p>
      <p>
        <span className="font-semibold">Email:</span> {employee.email}
      </p>
      <p>
        <span className="font-semibold">Employee ID:</span>{" "}
        {employee.employeeId}
      </p>
    </section>
  );
};

export default EmployeeInfo;
