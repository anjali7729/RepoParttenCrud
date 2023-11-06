﻿using Microsoft.EntityFrameworkCore;

namespace CrudApiRepo.Models
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions options) : base(options) { }

        public DbSet<Product> Products { get; set; }
    }
}
