namespace API.Database.Entities;

using global::API.Database.Entities.Base;
using global::API.Database.Entities.Enums;
using MongoDB.Bson.Serialization.Attributes;

public class User : EntityBase<Guid>
{
    [BsonElement("login")]
    public required string Login { get; init; }

    [BsonElement("name")]
    public required string Name { get; init; }

    [BsonElement("surname")]
    public required string Surname { get; init; }

    [BsonElement("role")]
    public required Role Role { get; init; }

    [BsonElement("password_hash")]
    public required string PasswordHash { get; init; }

    public string FullName => $"{this.Name} {this.Surname}";
}