namespace API.Database.Entities.Base;

using MongoDB.Bson.Serialization.Attributes;

public abstract class EntityBase<TKey>
{
    [BsonId]
    public TKey Id { get; init; }
}