using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace CrudRepository.Models
{
    public class JwtServices
    {
        public string SecretKey { get; set; }
        public int TokenDuration { get; set; }
        
        private readonly IConfiguration _configuration;
        public JwtServices(IConfiguration configuration)
        {
            this._configuration = configuration;
            this.SecretKey = _configuration.GetSection("JwtConfig").GetSection("Key").Value;
            this.TokenDuration = Int32.Parse(_configuration.GetSection("JwtConfig").GetSection("Duration").Value);
        }

        public string GenerateToken(string id,string firstname,string lastname,string email,string mobile,string gender)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(this.SecretKey));
            var signature = new SigningCredentials(key, SecurityAlgorithms.Aes128CbcHmacSha256);
            var payload = new[]
            {
                new Claim("id",id),
                new Claim("firstname",firstname),
                new Claim("lastname",lastname),
                new Claim("email",email),
                new Claim("mobile",mobile),
                new Claim("gender",gender)
            };

            var JwtToken = new JwtSecurityToken(
                issuer: "localhost",
                audience: "localhost",
                claims: payload,
                expires: DateTime.Now.AddMinutes(TokenDuration),
                signingCredentials: signature
                );
            return new JwtSecurityTokenHandler().WriteToken(JwtToken);
        }
    }
}
