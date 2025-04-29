namespace backend.Mocks;

using backend.Model;

public class UsersMock
{
    public static User Admin = new(Guid.NewGuid(), "admin", "John", "Admin", null, Role.ADMIN, "admin");
    public static User Devops = new(Guid.NewGuid(), "devops", "John", "Devops", null, Role.DEVOPS, "devops");
    public static User Developer = new(Guid.NewGuid(), "developer", "John", "Developer", null, Role.DEVELOPER,
        "developer");

    public static IEnumerable<User> Users = [Admin, Devops, Developer];
}