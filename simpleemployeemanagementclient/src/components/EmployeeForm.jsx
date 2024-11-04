// src/components/EmployeeForm.jsx

import { useState, useEffect } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes for type checking

function EmployeeForm({ employee, onSubmit, onCancel }) {
    const [formData, setFormData] = useState({
        name: '',
        position: '',
        salary: '',
    });

    // Populate the form with employee data when editing
    useEffect(() => {
        if (employee) {
            setFormData({
                name: employee.name,
                position: employee.position,
                salary: employee.salary.toString(), // Convert salary to string for input
            });
        } else {
            // Reset form if no employee is provided
            setFormData({ name: '', position: '', salary: '' });
        }
    }, [employee]);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Pass the form data to the onSubmit callback
        onSubmit({
            ...formData,
            id: employee?.id, // Include id if editing
            salary: parseFloat(formData.salary), // Ensure salary is a number
        });
        if (!employee) {
            // Reset form data only if adding a new employee
            setFormData({ name: '', position: '', salary: '' });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-2 border rounded"
                    required
                />
            </div>
            <div>
                <label className="block text-sm font-medium mb-1">Position</label>
                <input
                    type="text"
                    value={formData.position}
                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                    className="w-full p-2 border rounded"
                    required
                />
            </div>
            <div>
                <label className="block text-sm font-medium mb-1">Salary</label>
                <input
                    type="number"
                    value={formData.salary}
                    onChange={(e) => {
                        const value = e.target.value;
                        if (value === '' || value >= 0) {
                            setFormData({ ...formData, salary: value }); // Only update if value is valid
                        }
                    }}
                    className="w-full p-2 border rounded"
                    required
                />
            </div>
            <div className="flex space-x-2">
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    {employee ? 'Update' : 'Add'} Employee
                </button>
                {employee && (
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                    >
                        Cancel
                    </button>
                )}
            </div>
        </form>
    );
}

// PropTypes for type checking
EmployeeForm.propTypes = {
    employee: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        position: PropTypes.string,
        salary: PropTypes.number,
    }),
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
};

export default EmployeeForm;
