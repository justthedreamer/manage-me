namespace API.Database.Repositories.Interfaces;

using global::API.Database.Entities;

public interface IProjectRepository : IRepositoryBase<Project, Guid>
{
    Task<IEnumerable<Project>> GetAllAsync();
}