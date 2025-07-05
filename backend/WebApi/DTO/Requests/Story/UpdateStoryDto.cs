namespace API.DTO.Requests.Story;

using System.ComponentModel.DataAnnotations;
using global::API.Database.Entities.Enums;

public record UpdateStoryDto
{
    [Required]
    public string Name { get; init; }

    [Required]
    public string Description { get; init; }

    [Required]
    public Priority Priority { get; init; }

    [Required]
    public WorkingState State { get; init; }
}