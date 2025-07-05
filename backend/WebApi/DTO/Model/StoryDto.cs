namespace API.DTO.Model;

using global::API.Database.Entities;
using global::API.Database.Entities.Enums;

public class StoryDto
{
    public string UserLogin { get; set; }
    public string Name { get; set; }
    public Priority Priority { get; set; }
    public WorkingState WorkingState { get; set; }
    public DateTime CreatedAt { get; set; }

    public static StoryDto FromStory(Story story) => new()
    {
        UserLogin = story.UserLogin,
        Name = story.Name,
        WorkingState = story.State,
        Priority = story.Priority,
        CreatedAt = story.CreatedAt,
    };
}