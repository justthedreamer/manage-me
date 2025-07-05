namespace API.Database.Repositories.Interfaces;

using global::API.API;
using global::API.Database.Entities;

public interface IUserRepository : IRepositoryBase<User, Guid>
{
    Task<User?> GetUserByLoginAsync(string login);
    Task<IEnumerable<User>> GetUsersByRoleAsync(GetUsersByRolesRequest request);
}