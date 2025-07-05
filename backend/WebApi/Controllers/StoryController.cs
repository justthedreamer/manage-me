namespace API.Controllers;

using global::API.Database.Entities;
using global::API.Database.Repositories.Interfaces;
using global::API.DTO.Model;
using global::API.DTO.Requests.Story;
using global::API.Services.App;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Authorize]
[Route("api/projects/{projectId:guid}/stories")]
public class StoryController(
    IStoryRepository storyRepository,
    IRepositoryHelperService repositoryHelper) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<IEnumerable<StoryDto>>> GetStories(Guid projectId)
    {
        var exists = await repositoryHelper.EnsureExistsAsync(projectId, null, null, null);
        if (exists.Error)
            return this.NotFound(exists.Message);

        var stories = await storyRepository.GetByProjectIdAsync(projectId);
        return this.Ok(stories);
    }

    [HttpGet("{storyId:guid}")]
    public async Task<ActionResult<StoryDto>> GetStory(Guid projectId, Guid storyId)
    {
        var exists = await repositoryHelper.EnsureExistsAsync(projectId, null, null, null);
        if (exists.Error)
            return this.NotFound(exists.Message);

        var story = await storyRepository.GetByIdAsync(storyId);
        if (story is null)
            return this.NotFound($"Story with provided ID: {storyId} was not found");

        return this.Ok(story);
    }

    [HttpPost]
    public async Task<IActionResult> CreateStory(Guid projectId, [FromBody] CreateStoryDto dto)
    {
        var exists = await repositoryHelper.EnsureExistsAsync(projectId, null, null, null);
        if (exists.Error)
            return this.NotFound(exists.Message);

        var story = Story.Create(projectId, this.GetUserLogin(), dto);

        await storyRepository.AddAsync(story);

        return this.CreatedAtAction(nameof(GetStory), new { projectId, storyId = story.Id }, StoryDto.FromStory(story));
    }

    [HttpDelete("{storyId:guid}")]
    public async Task<IActionResult> DeleteStory(Guid projectId, Guid storyId)
    {
        var exists = await repositoryHelper.EnsureExistsAsync(projectId, storyId, null, null);
        if (exists.Error)
            return this.NotFound(exists.Message);

        if (!await storyRepository.DeleteAsync(storyId))
            return this.Problem(detail: "Failed to delete story");

        return this.NoContent();
    }

    [HttpPatch("{storyId:guid}")]
    public async Task<IActionResult> UpdateStory(Guid projectId, Guid storyId, [FromBody] UpdateStoryDto dto)
    {
        var exists = await repositoryHelper.EnsureExistsAsync(projectId, storyId, null, null);
        if (exists.Error)
            return this.NotFound(exists.Message);

        var story = await storyRepository.GetByIdAsync(storyId);
        if (story is null)
            return this.NotFound($"Story with provided ID: {storyId} was not found");

        story.Update(dto);

        if (!await storyRepository.UpdateAsync(story))
            return this.Problem(detail: "Failed to update story");

        return this.NoContent();
    }
}