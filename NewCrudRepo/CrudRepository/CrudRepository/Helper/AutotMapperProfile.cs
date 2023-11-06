using AutoMapper;
using CrudRepository.DTO;
using CrudRepository.Models;

namespace CrudRepository.Helper
{
    public class AutotMapperProfile : Profile
    {
        public AutotMapperProfile()
        {
            CreateMap<Category, CategoryDto>().ReverseMap();
        }
    }
}