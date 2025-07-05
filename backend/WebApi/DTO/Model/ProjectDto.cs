namespace API.DTO.Model;

using global::API.Database.Entities;

public class ProjectDto
{
    public Guid Id { get; init; }
    public string Name { get; init; }
    public string Description { get; init; }

    public static ProjectDto FromProject(Project project) => new()
    {
        Id = project.Id,
        Name = project.Name,
        Description = project.Description,
    };
}