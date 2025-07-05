namespace API.Security;

public interface IPasswordManager
{
    string Secure(string password);
    bool Validate(string hashedPassword, string providedPassword);
}