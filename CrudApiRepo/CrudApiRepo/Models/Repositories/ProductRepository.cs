using CrudApiRepo.Models.EF_Core;
using System.Collections.Generic;
using System.Linq;

namespace CrudApiRepo.Models.Repositories
{
    public class ProductRepository : GenericRepository<Product>, IProductRepository
    {
        private readonly AppDbContext _context;
        public ProductRepository(AppDbContext appDbContext) : base(appDbContext)
        {
            _context = appDbContext;
        }

        public List<Product> Search(string keyword)
        {
            return _context.Products.Where(p => p.Name == keyword).ToList();
        }

        public List<Product> Search(double min, double max)
        {
            return _context.Products.Where(p => p.Price >= min && p.Price <= max).ToList();
        }
    }
}
