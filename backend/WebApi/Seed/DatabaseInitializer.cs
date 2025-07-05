namespace API.Seed;

using global::API.Database.Entities;
using global::API.Database.Repositories.Interfaces;
using global::API.Mocks;
using Microsoft.AspNetCore.Identity;

public class DatabaseInitializer(
    IServiceProvider serviceProvider,
    ILogger<DatabaseInitializer> logger) : IHostedService
{
    public async Task StartAsync(CancellationToken cancellationToken)
    {
        using var scoped = serviceProvider.CreateScope();
        var userRepository = scoped.ServiceProvider.GetRequiredService<IUserRepository>();
        var projectRepository = scoped.ServiceProvider.GetRequiredService<IProjectRepository>();
        var passwordHasher = scoped.ServiceProvider.GetRequiredService<IPasswordHasher<User>>();

        if (userRepository is null)
        {
            throw new InvalidOperationException("DatabaseInitializer: User repository is null");
        }

        // Admin
        var adminMock = UsersMock.GetAdminMock(passwordHasher);
        var admin = await userRepository.GetByIdAsync(adminMock.Id);
        if (admin is null)
        {
            await userRepository.AddAsync(adminMock);
        }

        // Developer
        var developerMock = UsersMock.GetDeveloperMock(passwordHasher);
        var developer = await userRepository.GetByIdAsync(developerMock.Id);
        if (developer is null)
        {
            await userRepository.AddAsync(developerMock);
            logger.LogInformation("Developer was added to the database");
        }

        // Devops
        var devopsMock = UsersMock.GetDevopsMock(passwordHasher);
        var devops = await userRepository.GetByIdAsync(devopsMock.Id);
        if (devops is null)
        {
            await userRepository.AddAsync(devopsMock);
            logger.LogInformation("Devops was added to the database");
        }

        // Project
        var projectMock = ProjectMock.Project;
        var project = await projectRepository.GetByIdAsync(projectMock.Id);
        if (project is null)
        {
            await projectRepository.AddAsync(projectMock);
            logger.LogInformation("Project was added to the database");
        }
    }

    public Task StopAsync(CancellationToken cancellationToken) => Task.CompletedTask;
}