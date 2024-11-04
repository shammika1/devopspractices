// src/components/EmployeeList.jsx

import PropTypes from 'prop-types'; // Import PropTypes for type checking

function EmployeeList({ employees, onEdit, onDelete }) {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="px-4 py-2 border">Name</th>
                        <th className="px-4 py-2 border">Position</th>
                        <th className="px-4 py-2 border">Salary</th>
                        <th className="px-4 py-2 border">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.length === 0 ? (
                        <tr>
                            <td colSpan="4" className="px-4 py-2 text-center border">
                                No employees found.
                            </td>
                        </tr>
                    ) : (
                        employees.map((employee) => (
                            <tr key={employee.id} className="hover:bg-gray-50">
                                <td className="px-4 py-2 border">{employee.name}</td>
                                <td className="px-4 py-2 border">{employee.position}</td>
                                <td className="px-4 py-2 border">${employee.salary.toFixed(2)}</td>
                                <td className="px-4 py-2 border">
                                    <button
                                        onClick={() => onEdit(employee)}
                                        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => onDelete(employee.id)}
                                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}

// PropTypes for type checking
EmployeeList.propTypes = {
    employees: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            position: PropTypes.string.isRequired,
            salary: PropTypes.number.isRequired,
        })
    ).isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
};

export default EmployeeList;
