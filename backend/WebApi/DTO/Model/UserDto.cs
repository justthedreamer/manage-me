namespace API.DTO.Model;

using global::API.Database.Entities;
using global::API.Database.Entities.Enums;

public class UserDto
{
    public Guid Id { get; init; }
    public string Login { get; init; }
    public string Name { get; init; }
    public string Surname { get; init; }
    public Role Role { get; init; }

    public static UserDto FromUser(User user) => new()
    {
        Id = user.Id,
        Login = user.Login,
        Name = user.Name,
        Surname = user.Surname,
        Role = user.Role,
    };
}