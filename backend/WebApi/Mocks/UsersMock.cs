namespace API.Mocks;

using global::API.Database.Entities;
using global::API.Database.Entities.Enums;
using Microsoft.AspNetCore.Identity;

public class UsersMock
{
    public static User GetAdminMock(IPasswordHasher<User> passwordHasher) => new()
    {
        Id = Guid.Parse("5c0292c3-a15e-43e5-8cf7-9f4b01dc3d0a"),
        Login = "admin",
        Name = "admin",
        Surname = "admin",
        Role = Role.ADMIN,
        PasswordHash = passwordHasher.HashPassword(default, "admin"),
    };

    public static User GetDevopsMock(IPasswordHasher<User> passwordHasher) => new()
    {
        Id = Guid.Parse("3ce70f86-7bf5-4711-b39b-b6c46662308a"),
        Login = "devops",
        Name = "devops",
        Surname = "devops",
        Role = Role.DEVOPS,
        PasswordHash = passwordHasher.HashPassword(default, "devops"),
    };

    public static User GetDeveloperMock(IPasswordHasher<User> passwordHasher) => new()
    {
        Id = Guid.Parse("39d82b11-76f6-48b1-bb76-23447df01231"),
        Login = "developer",
        Name = "developer",
        Surname = "developer",
        Role = Role.DEVOPS,
        PasswordHash = passwordHasher.HashPassword(default, "developer"),
    };
}