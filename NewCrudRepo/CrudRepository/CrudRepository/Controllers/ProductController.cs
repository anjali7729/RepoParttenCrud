using CrudRepository.Models;
using CrudRepository.Models.Repository;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;

namespace CrudRepository.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IProductRepository _productRepository;
        private readonly IWebHostEnvironment _hostingEnvironment;
        public ProductController(IProductRepository productRepository,IWebHostEnvironment hostEnvironment)
        {
            _productRepository = productRepository;
            _hostingEnvironment = hostEnvironment;
        }

        [HttpGet("findall")]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                var s = await _productRepository.GetAllProduct();
                return Ok(s);
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

                var s = await _productRepository.GetProductById(id);
                return Ok(s);
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpPost("create")]

        public async Task<IActionResult> Create([FromForm] Product p)
        {
            try
            {
                if (p.Image != null)
                {
                    string uploadFolder = Path.Combine(_hostingEnvironment.WebRootPath, "Images");
                    string uniqueFileName = Guid.NewGuid().ToString() + "_" + p.Image.FileName;
                    string uploadFieldPath = Path.Combine(uploadFolder, uniqueFileName);
                    p.Profile = uniqueFileName;
                    p.Image.CopyTo(new FileStream(uploadFieldPath, FileMode.Create));
                }

                await _productRepository.Create(p);
                return Ok(p);
            }
            catch 
            { 
                return BadRequest();
            }
        }
        [HttpPut("update/{id}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromForm] Product p)
        {
            try
            {
                if (p.Image != null)
                {
                    string uploadFolder = Path.Combine(_hostingEnvironment.WebRootPath, "Images");
                    string uniqueFileName = Guid.NewGuid().ToString() + "_" + p.Image.FileName;
                    string uploadFieldPath = Path.Combine(uploadFolder, uniqueFileName);
                    p.Profile = uniqueFileName;
                    p.Image.CopyTo(new FileStream(uploadFieldPath, FileMode.Create));
                }

                await _productRepository.Update(id, p);
                return Ok(p);
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {

            try
            {
                await _productRepository.Delete(id);
                return Ok();
            }
            catch { return BadRequest(); }  
        }

        [HttpGet("search/{keyword}")]
        public async Task<IActionResult> Search(string keyword)
        {
            try
            {
                return Ok(await _productRepository.Search(keyword));
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
                return Ok(await _productRepository.Search(min,max));
            }
            catch
            {
                return BadRequest();
            }
        }

    }
}
