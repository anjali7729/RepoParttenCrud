using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations.Schema;

namespace CrudRepository.Models
{
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }    
        public string Description { get; set; }
        public int Price { get; set; }
        public int CateId { get; set; }
        public string CateName { get; set; }
        public string BrandName { get; set; }
        public string Profile { get; set; }
        [NotMapped]
        public string FileData { get; set; }
        [NotMapped]
        public IFormFile Image {  get; set; }
    }
}
