using CrudRepository.Models.Repository;
using CrudRepository.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.IO;
using System.Threading.Tasks;
using System;

namespace CrudRepository.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ICategory _categoryRepo;
        public CategoryController(ICategory categoryRepo)
        {
            _categoryRepo = categoryRepo;
        }

        [HttpGet("findall")]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                var s = await _categoryRepo.GetAllCategory();
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
                var s = await _categoryRepo.GetCategoryById(id);
                return Ok(s);
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpPost("create")]

        public async Task<IActionResult> Create(Category c)
        {
            try
            {
                await _categoryRepo.Create(c);
                return Ok(c);
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpPut("update/{id}")]
        public async Task<IActionResult> Update([FromRoute] int id,Category c)
        {
            try
            {
                await _categoryRepo.Update(id, c);
                return Ok(c);
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
                await _categoryRepo.Delete(id);
                return Ok();
            }
            catch { return BadRequest(); }
        }
    }
}
