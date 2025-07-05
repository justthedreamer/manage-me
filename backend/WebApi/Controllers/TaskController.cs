namespace API.Controllers;

using global::API.Database.Entities.Enums;
using global::API.Database.Entities.Tasks;
using global::API.Database.Repositories.Interfaces;
using global::API.DTO.Model;
using global::API.DTO.Requests.Task;
using global::API.Services.App;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Authorize]
[Route("api/projects/{projectId:guid}/stories/{storyId:guid}/tasks")]
public class TaskController(
    ITaskRepository taskRepository,
    IRepositoryHelperService repositoryHelper) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<IEnumerable<TaskDto>>> GetTasks(Guid projectId, Guid storyId)
    {
        var exists = await repositoryHelper.EnsureExistsAsync(projectId, storyId, null, null);
        if (exists.Error) return this.NotFound(exists.Message);
        var tasks = await taskRepository.GetAllByStoryIdAsync(storyId);
        return this.Ok(tasks.Select(TaskDto.FromTask));
    }

    [HttpGet("{taskId:guid}")]
    public async Task<ActionResult<TaskDto>> GetTask(Guid projectId, Guid storyId, Guid taskId)
    {
        var exists = await repositoryHelper.EnsureExistsAsync(projectId, storyId, null, null);
        if (exists.Error) return this.NotFound(exists.Message);

        var task = await taskRepository.GetByIdAsync(taskId);
        if (task is null) return this.NotFound($"Task with ID {taskId} does not exist.");

        return this.Ok(TaskDto.FromTask(task));
    }

    [HttpPost]
    public async Task<IActionResult> CreateTask(Guid projectId, Guid storyId, [FromBody] CreateTaskDto dto)
    {
        var exists = await repositoryHelper.EnsureExistsAsync(projectId, storyId, null, null);
        if (exists.Error) return this.NotFound(exists.Message);

        var task = new ProjectTask
        {
            Id = Guid.NewGuid(),
            StoryId = storyId,
            Name = dto.Name,
            Description = dto.Description,
            Priority = dto.Priority,
            CreatedAt = DateTime.UtcNow,
            WorkingState = WorkingState.TODO,
            EstimatedFinishTimeHours = dto.EstimatedFinishTimeHours,
        };

        await taskRepository.AddAsync(task);

        return this.CreatedAtAction(nameof(this.GetTask), new { projectId, storyId, taskId = task.Id }, task);
    }

    [HttpDelete("{taskId:guid}")]
    public async Task<IActionResult> DeleteTask(Guid projectId, Guid storyId, Guid taskId)
    {
        var exists = await repositoryHelper.EnsureExistsAsync(projectId, storyId, taskId, null);
        if (exists.Error) return this.NotFound(exists.Message);

        await taskRepository.DeleteAsync(taskId);

        return this.NoContent();
    }

    [HttpPatch("{taskId:guid}")]
    public async Task<IActionResult> UpdateTask(Guid projectId, Guid storyId, Guid taskId, [FromBody] UpdateTaskDto dto)
    {
        var exists = await repositoryHelper.EnsureExistsAsync(projectId, storyId, null, null);
        if (exists.Error) return this.NotFound(exists.Message);

        var task = await taskRepository.GetByIdAsync(taskId);
        if (task is null) return this.NotFound($"Task with ID {taskId} does not exist.");

        task.Update(dto);
        await taskRepository.UpdateAsync(task);

        return this.NoContent();
    }

    [HttpPatch("{taskId:guid}/state/doing")]
    public async Task<IActionResult> SetDoingState(Guid projectId, Guid storyId, Guid taskId, [FromBody] Guid userId)
    {
        var exists = await repositoryHelper.EnsureExistsAsync(projectId, storyId, null, userId);
        if (exists.Error) return this.NotFound(exists.Message);

        var task = await taskRepository.GetByIdAsync(taskId);
        if (task is null) return this.NotFound($"Task with ID {taskId} does not exist.");

        task.SetDoing(userId);

        if (!await taskRepository.UpdateAsync(task))
        {
            return this.Problem(detail: "Task details could not be updated.");
        }

        return this.NoContent();
    }

    [HttpPatch("{taskId:guid}/state/done")]
    public async Task<IActionResult> SetDoneState(Guid projectId, Guid storyId, Guid taskId)
    {
        var exists = await repositoryHelper.EnsureExistsAsync(projectId, storyId, null, null);
        if (exists.Error) return this.NotFound(exists.Message);

        var task = await taskRepository.GetByIdAsync(taskId);
        if (task is null) return this.NotFound($"Task with ID {taskId} does not exist.");

        task.SetDone();

        if (!await taskRepository.UpdateAsync(task))
        {
            return this.Problem(detail: "Task details could not be updated.");
        }

        return this.NoContent();
    }
}