namespace API.Database.Repositories.Interfaces;

using global::API.Database.Entities;

public interface IStoryRepository : IRepositoryBase<Story, Guid>
{
    Task<IEnumerable<Story>> GetByProjectIdAsync(Guid projectId);
}