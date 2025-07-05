namespace API.Services.App;

using global::API.Database.Repositories.Interfaces;

public class RepositoryHelperService(
    IProjectRepository projectRepository,
    IStoryRepository storyRepository,
    ITaskRepository taskRepository,
    IUserRepository userRepository) : IRepositoryHelperService
{
    public async Task<EnsureExistsResult> EnsureExistsAsync(Guid? projectId, Guid? storyId, Guid? taskId, Guid? userId)
    {
        var result = new EnsureExistsResult();

        if (projectId is not null)
        {
            if (!await projectRepository.ExistsAsync(projectId.Value))
            {
                result.SetError("Project does not exist");
                return result;
            }
        }

        if (storyId is not null)
        {
            if (!await storyRepository.ExistsAsync(storyId.Value))
            {
                result.SetError("Story does not exist");
                return result;
            }
        }

        if (taskId is not null)
        {
            if (!await taskRepository.ExistsAsync(taskId.Value))
            {
                result.SetError("Task does not exist");
                return result;
            }
        }

        if (userId is not null)
        {
            if (await userRepository.ExistsAsync(userId.Value))
            {
                return result;
            }

            result.SetError("User does not exist");
            return result;
        }

        return result;
    }
}