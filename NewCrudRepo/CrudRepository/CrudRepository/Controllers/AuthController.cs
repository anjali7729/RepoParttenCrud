using CrudRepository.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace CrudRepository.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly AppDbContext _appDbContext;
        public AuthController(IConfiguration config,AppDbContext appDbContext) 
        { 
           _configuration = config;
           _appDbContext = appDbContext;
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<IActionResult> Register(Register register)
        {
            if (await _appDbContext.Registers.Where(u => u.Email == register.Email).FirstOrDefaultAsync() != null) 
            {
                return Ok("Email Already Exist");
            }
            register.MemberSince = DateTime.Now;
            await _appDbContext.Registers.AddAsync(register);
            _appDbContext.SaveChanges();
            return Ok(register);
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<IActionResult> Login(Login user)
        {
            var userAvailable = await _appDbContext.Registers.Where(u => u.Email == user.Email && u.Password == user.Password).FirstOrDefaultAsync();
            if (userAvailable != null)
            {
                return Ok(new JwtServices(_configuration).GenerateToken(
                    userAvailable.UserId.ToString(),
                    userAvailable.FirstName,
                    userAvailable.LastName,
                    userAvailable.Email,
                    userAvailable.PhoneNumber,
                    userAvailable.Gender
                    ));
            }
            return Ok("Fail");
        }

    }
}
