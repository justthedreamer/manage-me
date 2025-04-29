namespace backend.Model;

public class User
{
    public Guid Id { get; set; }
    public string Login { get; set; }
    public string Name { get; set; }
    public string Surname { get; set; }
    public Guid? AttachedProjectId { get; set; }
    public Role Role { get; set; }
    public string Password { get; set; }

    public User(Guid id, string login, string name, string surname, Guid? attachedProjectId, Role role, string password)
    {
        this.Id = id;
        this.Login = login;
        this.Name = name;
        this.Surname = surname;
        this.AttachedProjectId = attachedProjectId;
        this.Role = role;
        this.Password = password;
    }
}