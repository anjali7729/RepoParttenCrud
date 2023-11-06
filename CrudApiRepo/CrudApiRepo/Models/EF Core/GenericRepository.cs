
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace CrudApiRepo.Models.EF_Core
{
    public class GenericRepository<TEntity> : IGenericRepository<TEntity> where TEntity : class, IEntity

    {
        private readonly AppDbContext _appDbContext;
        public GenericRepository(AppDbContext appDbContext)
        {
            this._appDbContext = appDbContext;
        }
        public async Task Create(TEntity entity)
        {
             await _appDbContext.Set<TEntity>().AddAsync(entity);
             await _appDbContext.SaveChangesAsync();              
        }

        public async Task Delete(int id)
        {
            var entity = await _appDbContext.Set<TEntity>().FindAsync(id);
            _appDbContext.Set<TEntity>().Remove(entity);
            await _appDbContext.SaveChangesAsync();
        }
        public async Task Update(int id, TEntity entity)
        {
            _appDbContext.Set<TEntity>().Update(entity);
            await _appDbContext.SaveChangesAsync();
        }

        public async Task<TEntity> GetById(int id)
        {
            return await _appDbContext.Set<TEntity>().AsNoTracking().FirstOrDefaultAsync(e => e.Id == id);
        }

        IQueryable<TEntity> IGenericRepository<TEntity>.GetAll()
        {
            return _appDbContext.Set<TEntity>().AsNoTracking();
        }
    }
}
