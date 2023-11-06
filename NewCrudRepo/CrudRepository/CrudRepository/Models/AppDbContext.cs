using Microsoft.EntityFrameworkCore;

namespace CrudRepository.Models
{
    public class AppDbContext:DbContext
    {
        public AppDbContext(DbContextOptions options) : base(options) { }
        public DbSet<Product> Products { get; set; }

        public DbSet<Category> Categories { get; set; }

        public DbSet<Register> Registers { get; set; }

    }
}
