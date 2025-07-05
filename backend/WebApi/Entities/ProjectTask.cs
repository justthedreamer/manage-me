namespace API.Database.Entities.Tasks;

using global::API.Database.Entities.Base;
using global::API.Database.Entities.Enums;
using global::API.DTO.Requests.Task;
using MongoDB.Bson.Serialization.Attributes;

public class ProjectTask : EntityBase<Guid>
{
    [BsonElement("story_id")]
    public required Guid StoryId { get; init; }

    [BsonElement("name")]
    public required string Name { get; set; }

    [BsonElement("description")]
    public required string Description { get; set; }

    [BsonElement("priority")]
    public required Priority Priority { get; set; }

    [BsonElement("estimated_finish_time_hours")]
    public required int EstimatedFinishTimeHours { get; set; }

    [BsonElement("working_state")]
    public required WorkingState WorkingState { get; set; }

    [BsonElement("created_at")]
    public required DateTime CreatedAt { get; init; }

    [BsonElement("user_id")]
    public Guid? UserId { get; set; }

    [BsonElement("complete_date")]
    public DateTime? CompleteDate { get; set; }

    public void Update(UpdateTaskDto dto)
    {
        this.Name = dto.Name;
        this.Description = dto.Description;
        this.Priority = dto.Priority;
        this.EstimatedFinishTimeHours = dto.EstimatedFinishTimeHours;
    }

    public void SetDoing(Guid userId)
    {
        if (this.WorkingState != WorkingState.TODO)
        {
            throw new InvalidOperationException("");
        }

        this.WorkingState = WorkingState.DOING;
        this.UserId = userId;
    }

    public void SetDone()
    {
        if (this.WorkingState != WorkingState.DOING)
        {
            throw new InvalidOperationException("");
        }

        this.WorkingState = WorkingState.DONE;
        this.CompleteDate = DateTime.UtcNow;
    }
}