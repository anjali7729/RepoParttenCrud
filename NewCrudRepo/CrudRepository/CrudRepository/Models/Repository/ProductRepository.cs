using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CrudRepository.Models.Repository
{
    public class ProductRepository : IProductRepository
    {
        private readonly AppDbContext _context;
        public ProductRepository(AppDbContext context) 
        { 
            this._context = context;
        }
        public async Task Create(Product p)
        {
            await _context.Products.AddAsync(p);            
            await _context.SaveChangesAsync();
        }

        public async Task Delete(int id)
        {
            var pro = await _context.Products.FindAsync(id);
            _context.Remove(pro);
            await _context.SaveChangesAsync();
        }

        public async Task<List<Product>> GetAllProduct()
        {
           return await _context.Products.ToListAsync();
        }

        public async Task<Product> GetProductById(int id)
        {
            return await _context.Products.Where(p => p.Id == id).FirstOrDefaultAsync();
        }

        public async Task Update(int id, Product p)
        {
            var prod = await _context.Products.FindAsync(id);

                prod.Name = p.Name; 
                prod.Description = p.Description;
                prod.Price = p.Price;
                prod.CateName = p.CateName;
                prod.BrandName = p.BrandName;
                prod.Profile = p.Profile;

                await _context.SaveChangesAsync();       
            
        }

        public async Task<List<Product>> Search(double min, double max)
        {
            return await _context.Products.Where(p => p.Price >= min && p.Price <= max).ToListAsync();
        }
        public async Task<List<Product>> Search(string keyword)
        {
            return await _context.Products.Where(p => p.Name == keyword).ToListAsync();
        }
    }
}
