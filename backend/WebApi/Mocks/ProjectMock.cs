namespace API.Mocks;

using global::API.Database.Entities;

public class ProjectMock
{
    public static Project Project = new()
    {
        Id = Guid.Parse("5a66fd13-ddf0-4e2e-ac4d-e056ab60a40b"),
        Name = "Test Project",
        Description = "Test Description",
    };
}