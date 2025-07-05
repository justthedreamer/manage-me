namespace API.Services.App;

public interface IRepositoryHelperService
{
    Task<EnsureExistsResult> EnsureExistsAsync(Guid? projectId, Guid? storyId, Guid? taskId, Guid? userId);
}