namespace API.Security;

using global::API.Database.Entities;
using Microsoft.AspNetCore.Identity;

public class PasswordManager(IPasswordHasher<User> passwordHasher) : IPasswordManager
{
    public string Secure(string password) => passwordHasher.HashPassword(default, password);

    public bool Validate(string hashedPassword, string providedPassword) =>
        passwordHasher.VerifyHashedPassword(default, hashedPassword, providedPassword) ==
        PasswordVerificationResult.Success;
}