using CrudApiRepo.Models.EF_Core;
using System.Collections.Generic;

namespace CrudApiRepo.Models.Repositories
{
    public interface IProductRepository:IGenericRepository<Product>
    {
        public List<Product> Search(string keyword);
        public List<Product> Search(double min,double max);

    }
}
