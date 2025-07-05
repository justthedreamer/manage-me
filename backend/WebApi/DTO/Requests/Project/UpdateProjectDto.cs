namespace API.DTO.Requests.Project;

using System.ComponentModel.DataAnnotations;

public class UpdateProjectDto
{
    [Required]
    public string Name { get; init; }
    [Required]
    public string Description { get; init; }
}