namespace API.DTO.Model;

using global::API.Database.Entities.Enums;
using global::API.Database.Entities.Tasks;

public class TaskDto
{
    public Guid Id { get; init; }
    public Guid? UserId { get; init; }
    public string Name { get; init; }
    public string Description { get; init; }
    public int EstimatedFinishTimeHours { get; init; }
    public Priority Priority { get; init; }
    public WorkingState WorkingState { get; init; }
    public DateTime CreatedAt { get; init; }
    public DateTime? CompleteDate { get; init; }

    public static TaskDto FromTask(ProjectTask task) => new()
    {
        Id = task.Id,
        UserId = task.UserId,
        Name = task.Name,
        Description = task.Description,
        Priority = task.Priority,
        WorkingState = task.WorkingState,
        CreatedAt = task.CreatedAt,
        EstimatedFinishTimeHours = task.EstimatedFinishTimeHours,
        CompleteDate = task.CompleteDate,
    };
}