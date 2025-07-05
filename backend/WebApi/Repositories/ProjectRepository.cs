namespace API.Database.Repositories;

using global::API.Database.Entities;
using global::API.Database.Repositories.Interfaces;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

public class ProjectRepository(IMongoClient client, IOptions<MongoDbSettings> mongoSettings)
    : RepositoryBase<Project, Guid>(client, mongoSettings), IProjectRepository
{
    public async Task<IEnumerable<Project>> GetAllAsync() => await this.Collection.Find(_ => true).ToListAsync();
}