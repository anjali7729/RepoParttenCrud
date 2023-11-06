    using System.Collections.Generic;
    using System.Threading.Tasks;

    namespace CrudRepository.Models.Repository
    {
        public interface IProductRepository
        {
            public Task<List<Product>> GetAllProduct();

            public Task<Product> GetProductById(int id);

            public Task Create(Product p);
            public Task Update(int id,Product p);
            public Task Delete(int id);
            public Task<List<Product>> Search(string keyword);
            public Task<List<Product>> Search(double min,double max);

    }
    }
