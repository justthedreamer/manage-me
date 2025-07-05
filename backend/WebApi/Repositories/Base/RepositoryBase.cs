namespace API.Database.Repositories;

using global::API.Database.Entities.Base;
using global::API.Database.Repositories.Interfaces;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

public abstract class RepositoryBase<TEntity, TKey> : IRepositoryBase<TEntity, TKey>
    where TEntity : EntityBase<TKey>
{
    protected readonly IMongoCollection<TEntity> Collection;

    protected RepositoryBase(IMongoClient client, IOptions<MongoDbSettings> mongoSettings)
    {
        var database = client.GetDatabase(mongoSettings.Value.DatabaseName);
        this.Collection = database.GetCollection<TEntity>(mongoSettings.Value.GetCollectionName<TEntity>());
    }

    public async Task<bool> ExistsAsync(TKey id)
    {
        var filter = Builders<TEntity>.Filter.Eq("Id", id);
        return await this.Collection.Find(filter).AnyAsync();
    }

    public async Task<TEntity> GetByIdAsync(TKey id)
    {
        var filter = Builders<TEntity>.Filter.Eq("Id", id);
        return await this.Collection.Find(filter).FirstOrDefaultAsync();
    }

    public async Task<bool> AddAsync(TEntity entity)
    {
        try
        {
            await this.Collection.InsertOneAsync(entity);
            return true;
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return false;
        }
    }

    public async Task<bool> UpdateAsync(TEntity entity)
    {
        var filter = Builders<TEntity>.Filter.Eq("Id", entity.Id);
        var result = await this.Collection.ReplaceOneAsync(filter, entity);
        return result.IsAcknowledged;
    }

    public async Task<bool> DeleteAsync(TKey id)
    {
        var filter = Builders<TEntity>.Filter.Eq("Id", id);
        var result = await this.Collection.DeleteOneAsync(filter);
        return result.IsAcknowledged;
    }
}