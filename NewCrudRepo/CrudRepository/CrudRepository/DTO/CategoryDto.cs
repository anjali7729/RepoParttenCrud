using System.ComponentModel.DataAnnotations;

namespace CrudRepository.DTO
{
    public class CategoryDto
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Name is Required.")]
        [StringLength(50, MinimumLength = 2)]
        [RegularExpression(".*[a-zA-Z]+.*", ErrorMessage = "Numeric Value not allow")]
        public string Name { get; set; }

        [Required(ErrorMessage = "Contry is Required.")]
        [StringLength(50, MinimumLength = 2)]
        [RegularExpression(".*[a-zA-Z]+.*", ErrorMessage = "Numeric Value not allow")]
        public string Brand { get; set; }
    }
}
