using CrudApiRepo.Models.EF_Core;

namespace CrudApiRepo.Models
{
    public class Product:IEntity
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public bool Status { get; set; }
        public int Price { get; set; }
    }
}
