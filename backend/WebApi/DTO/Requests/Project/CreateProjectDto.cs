namespace API.DTO.Requests.Project;

using System.ComponentModel.DataAnnotations;

public record CreateProjectDto
{
    [Required]
    public string Name { get; init; }

    [Required]
    public string Description { get; init; }
}