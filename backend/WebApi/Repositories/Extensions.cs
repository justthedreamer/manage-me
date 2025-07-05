namespace API.Repositories;

using global::API.Database.Repositories;
using global::API.Database.Repositories.Interfaces;

public static class Extensions
{
    public static IServiceCollection AddRepositories(this IServiceCollection services)
    {
        services.AddSingleton<IUserRepository, UserRepository>();
        services.AddSingleton<IProjectRepository, ProjectRepository>();
        services.AddSingleton<IStoryRepository, StoryRepository>();
        services.AddSingleton<ITaskRepository, TaskRepository>();
        return services;
    }
}