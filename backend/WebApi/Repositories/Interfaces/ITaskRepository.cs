namespace API.Database.Repositories.Interfaces;

using global::API.Database.Entities.Tasks;

public interface ITaskRepository : IRepositoryBase<ProjectTask, Guid>
{
    Task<IEnumerable<ProjectTask>> GetAllByStoryIdAsync(Guid storyId);
}