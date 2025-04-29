namespace backend.DTO;

using backend.Model;

public class UserDto
{
    public Guid Id { get; set; }
    public string Login { get; set; }
    public string Name { get; set; }
    public string Surname { get; set; }
    public string Role { get; set; }
    public Guid? AttachedProject { get; set; }

    public static UserDto FromUser(User user)
    {
        return new UserDto
        {
            Id = user.Id,
            Login = user.Login,
            Name = user.Name,
            Surname = user.Surname,
            Role = user.Role.ToString(),
            AttachedProject = user.AttachedProjectId,
        };
    }
}