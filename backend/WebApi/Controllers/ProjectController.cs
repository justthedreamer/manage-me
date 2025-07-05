namespace API.Controllers;

using global::API.Database.Entities;
using global::API.Database.Repositories.Interfaces;
using global::API.DTO.Model;
using global::API.DTO.Requests.Project;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualBasic.CompilerServices;

[ApiController]
[Authorize]
[Route("api/projects")]
public class ProjectController(IProjectRepository projectRepository) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<IEnumerable<ProjectDto>>> GetProjects()
    {
        return this.Ok((await projectRepository.GetAllAsync()).Select(ProjectDto.FromProject));
    }

    [HttpGet("{projectId:guid}")]
    public async Task<ActionResult<ProjectDto>> GetProjectById(Guid projectId)
    {
        var project = await projectRepository.GetByIdAsync(projectId);
        if (project is null)
        {
            return this.NotFound();
        }

        return this.Ok(ProjectDto.FromProject(project));
    }

    [HttpPost]
    public async Task<IActionResult> CreateProject([FromBody] CreateProjectDto dto)
    {
        var entity = new Project
        {
            Id = Guid.NewGuid(),
            Name = dto.Name,
            Description = dto.Description,
        };

        var success = await projectRepository.AddAsync(entity);

        if (!success)
        {
            return this.Problem(detail: "An error occurred while creating the project.");
        }

        return this.CreatedAtAction(nameof(this.GetProjectById), new { projectId = entity.Id }, entity);
    }

    [HttpDelete("{projectId:guid}")]
    public async Task<IActionResult> DeleteProject(Guid projectId)
    {
        var exists = await projectRepository.ExistsAsync(projectId);

        if (!exists)
        {
            return this.NotFound();
        }

        var success = await projectRepository.DeleteAsync(projectId);

        if (!success)
        {
            return this.Problem(detail: "An error occurred while deleting the project.");
        }

        return this.NoContent();
    }

    [HttpPatch("{projectId:guid}")]
    public async Task<IActionResult> UpdateProject(Guid projectId, [FromBody] UpdateProjectDto dto)
    {
        var project = await projectRepository.GetByIdAsync(projectId);

        if (project is null)
        {
            return this.NotFound("Project not found.");
        }

        project.Name = dto.Name;
        project.Description = dto.Description;

        var success = await projectRepository.UpdateAsync(project);

        if (!success)
        {
            return this.Problem(detail: "An error occurred while updating the project.");
        }

        return this.NoContent();
    }
}