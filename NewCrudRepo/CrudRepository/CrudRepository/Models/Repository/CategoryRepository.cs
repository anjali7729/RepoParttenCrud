using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CrudRepository.Models.Repository
{
    public class CategoryRepository : ICategory
    {
        private readonly AppDbContext _context;
        public CategoryRepository(AppDbContext context)
        {
            this._context = context;
        }
        public async Task Create(Category c)
        {
            await _context.Categories.AddAsync(c);
            await _context.SaveChangesAsync();
        }

        public async Task Delete(int id)
        {
            var cate = await _context.Categories.FindAsync(id);
            _context.Remove(cate);
            await _context.SaveChangesAsync();
        }

        public async Task<List<Category>> GetAllCategory()
        {
            return await _context.Categories.ToListAsync();
        }

        public async Task<Category> GetCategoryById(int id)
        {
            return await _context.Categories.Where(c => c.Id == id).FirstOrDefaultAsync();
        }

        public async Task Update(int id, Category c)
        {
            var cate = await _context.Categories.FindAsync(id);

            cate.Name = c.Name;
            cate.Brand = c.Brand;

            await _context.SaveChangesAsync();
        }
    }
}
