namespace API.Database.Repositories.Interfaces;

using global::API.Database.Entities.Tasks;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

public class TaskRepository : RepositoryBase<ProjectTask, Guid>, ITaskRepository
{
    public TaskRepository(IMongoClient client, IOptions<MongoDbSettings> mongoSettings)
        : base(client, mongoSettings)
    {
    }

    public async Task<IEnumerable<ProjectTask>> GetAllByStoryIdAsync(Guid storyId)
    {
        var filter = Builders<ProjectTask>.Filter.Eq(x => x.StoryId, storyId);
        return await this.Collection.Find(filter).ToListAsync();
    }
}