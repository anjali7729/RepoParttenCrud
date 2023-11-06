using CrudApiRepo.Models;
using CrudApiRepo.Models.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Threading.Tasks;

namespace CrudApiRepo.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private IProductRepository _productRepository;

        public ProductController(IProductRepository productRepository)
        {
            _productRepository = productRepository;
        }

        [HttpGet("findall")]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                return Ok(_productRepository.GetAll().ToList());
            }
            catch
            {
                return BadRequest();
            }

        }
        [HttpGet("find/{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            try
            {
                var product = await _productRepository.GetById(id);
                return Ok(product);
            }
            catch
            {
                return BadRequest();
            }

        }

        [HttpGet("search/{keyword}")]
        public async Task<IActionResult> Search(string keyword)
        {
            try
            {
                return Ok(_productRepository.Search(keyword));
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpGet("search/{min}/{max}")]
        public async Task<IActionResult> Search(double min,double max)
        {
            try
            {
                return Ok(_productRepository.Search(min,max));
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpPost("create")]
        public async Task<IActionResult> Create(Product product)
        {
            try
            {
                await _productRepository.Create(product);
                return Ok(product);
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpPut("Update")]
        public async Task<IActionResult> Update(Product product)
        {
            try
            {
                await _productRepository.Update(product.Id,product);
                return Ok(product);
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpDelete("Delete")]
        public async Task<IActionResult> Delete(int Id)
        {
            try
            {
                await _productRepository.Delete(Id);
                return Ok();
            }
            catch
            {
                return BadRequest();
            }
        }

    }
}
