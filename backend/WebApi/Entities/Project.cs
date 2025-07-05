namespace API.Database.Entities;

using global::API.Database.Entities.Base;
using MongoDB.Bson.Serialization.Attributes;

public class Project : EntityBase<Guid>
{
    [BsonElement("name")]
    public required string Name { get; set; }

    [BsonElement("description")]
    public required string Description { get; set; }
}