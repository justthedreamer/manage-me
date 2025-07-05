namespace API.Database.Entities;

using global::API.Database.Entities.Base;
using global::API.Database.Entities.Enums;
using global::API.DTO.Requests.Story;
using MongoDB.Bson.Serialization.Attributes;

public class Story : EntityBase<Guid>
{
    [BsonElement("name")]
    public required Guid ProjectId { get; init; }

    [BsonElement("user_id")]
    public required string UserLogin { get; init; }

    [BsonElement("name")]
    public string Name { get; private set; }

    [BsonElement("description")]
    public string Description { get; private set; }

    [BsonElement("priority")]
    public Priority Priority { get; private set; }

    [BsonElement("working_state")]
    public WorkingState State { get; private set; }

    [BsonElement("created_at")]
    public required DateTime CreatedAt { get; init; }

    public void Update(UpdateStoryDto dto)
    {
        this.Name = dto.Name;
        this.Description = dto.Description;
        this.Priority = dto.Priority;
        this.State = dto.State;
    }

    public static Story Create(Guid projectId, string loginId, CreateStoryDto dto)
    {
        return new Story
        {
            Id = Guid.NewGuid(),
            Name = dto.Name,
            Description = dto.Description,
            ProjectId = projectId,
            UserLogin = loginId,
            Priority = dto.Priority,
            State = WorkingState.TODO,
            CreatedAt = DateTime.UtcNow,
        };
    }
}