namespace API.Database.Repositories;

using global::API.Database.Entities;
using global::API.Database.Repositories.Interfaces;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

public class StoryRepository(IMongoClient client, IOptions<MongoDbSettings> mongoSettings)
    : RepositoryBase<Story, Guid>(client, mongoSettings), IStoryRepository
{
    public async Task<IEnumerable<Story>> GetByProjectIdAsync(Guid projectId)
    {
        var filter = Builders<Story>.Filter.Eq(x => x.ProjectId, projectId);
        return await this.Collection.Find(filter).ToListAsync();
    }
}