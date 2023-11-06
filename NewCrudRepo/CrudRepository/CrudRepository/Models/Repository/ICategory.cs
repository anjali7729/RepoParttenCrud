using System.Collections.Generic;
using System.Threading.Tasks;

namespace CrudRepository.Models.Repository
{
    public interface ICategory
    {
        public Task<List<Category>> GetAllCategory();

        public Task<Category> GetCategoryById(int id);

        public Task Create(Category c);
        public Task Update(int id, Category c);
        public Task Delete(int id);
    }
}
