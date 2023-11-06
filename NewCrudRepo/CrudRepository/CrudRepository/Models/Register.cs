using System;
using System.ComponentModel.DataAnnotations;

namespace CrudRepository.Models
{
    public class Register
    {
        [Key]
        public int UserId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string PhoneNumber { get; set; }
        public string Gender { get; set; }
        public DateTime MemberSince { get; set; }


    }
}
