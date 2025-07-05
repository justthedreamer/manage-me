namespace API.Database.Repositories;

using global::API.API;
using global::API.Database.Entities;
using global::API.Database.Entities.Enums;
using global::API.Database.Repositories.Interfaces;
using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;

public class UserRepository : RepositoryBase<User, Guid>, IUserRepository
{
    private readonly IMongoCollection<User> Collection;

    public UserRepository(IMongoClient client, IOptions<MongoDbSettings> mongoSettings)
        : base(client, mongoSettings)
    {
        var database = client.GetDatabase(mongoSettings.Value.DatabaseName);
        this.Collection = database.GetCollection<User>(mongoSettings.Value.UserCollectionName);
    }

    public async Task<User?> GetUserByLoginAsync(string login)
    {
        var filer = Builders<User>.Filter.Eq(x => x.Login, login);
        return await this.Collection.Find(filer).FirstOrDefaultAsync();
    }

    public async Task<IEnumerable<User>> GetUsersByRoleAsync(GetUsersByRolesRequest request)
    {
        List<Role> roles = new();
        if (request.IsDeveloper) roles.Add(Role.DEVELOPER);
        if (request.IsDevops) roles.Add(Role.DEVOPS);

        if (roles.Count == 0)
        {
            return [];
        }

        var roleFilter = Builders<User>.Filter.In(u => u.Role, roles);

        FilterDefinition<User> finalFilter = roleFilter;

        if (!string.IsNullOrWhiteSpace(request.SearchingPhrase))
        {
            var phrase = request.SearchingPhrase.Trim().ToLower();
            var phraseRegex = new BsonRegularExpression(phrase, "i");

            var idFilter = Builders<User>.Filter.Regex(u => u.Id, phraseRegex);
            var fullNameFilter = Builders<User>.Filter.Regex(u => u.FullName, phraseRegex);

            var searchFilter = Builders<User>.Filter.Or(idFilter, fullNameFilter);

            finalFilter = Builders<User>.Filter.And(roleFilter, searchFilter);
        }

        return await Collection.Find(finalFilter).ToListAsync();
    }
}