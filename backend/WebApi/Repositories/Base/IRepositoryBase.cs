namespace API.Database.Repositories.Interfaces;

using global::API.Database.Entities.Base;

public interface IRepositoryBase<TEntity, in TKey> where TEntity : EntityBase<TKey>
{
    Task<bool> ExistsAsync(TKey id);
    Task<TEntity?> GetByIdAsync(TKey id);
    Task<bool> AddAsync(TEntity entity);
    Task<bool> UpdateAsync(TEntity entity);
    Task<bool> DeleteAsync(TKey id);
}