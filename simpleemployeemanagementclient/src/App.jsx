import { useState, useEffect } from 'react';
import EmployeeForm from './components/EmployeeForm';
import EmployeeList from './components/EmployeeList';

function App() {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const fetchEmployees = async () => {
    try {
        const response = await fetch('https://localhost:7183/api/Employee');
      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleSubmit = async (employee) => {
    try {
      const url = selectedEmployee
          ? `https://localhost:7183/api/Employee/${selectedEmployee.id}`
          : 'https://localhost:7183/api/Employee';
      
      const method = selectedEmployee ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(employee),
      });

      if (response.ok) {
        fetchEmployees();
        setSelectedEmployee(null);
      }
    } catch (error) {
      console.error('Error saving employee:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
        const response = await fetch(`https://localhost:7183/api/Employee/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchEmployees();
      }
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Employee Management System</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-semibold mb-4">
            {selectedEmployee ? 'Edit Employee' : 'Add New Employee'}
          </h2>
          <EmployeeForm
            employee={selectedEmployee}
            onSubmit={handleSubmit}
            onCancel={() => setSelectedEmployee(null)}
          />
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">Employee List</h2>
          <EmployeeList
            employees={employees}
            onEdit={setSelectedEmployee}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
}

export default App;