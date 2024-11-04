using Microsoft.EntityFrameworkCore;
using SimpleEmployeeManagement.Models;
namespace SimpleEmployeeManagement.Data
{
    public class EmployeeContext:DbContext
    {
        public EmployeeContext(DbContextOptions<EmployeeContext> options)
        : base(options)
        {
        }

        public DbSet<Employee> Employees { get; set; }
    }
}
