namespace API.Services;

using global::API.Database.Entities;
using global::API.Security;
using global::API.Services.App;
using global::API.Services.Auth;
using global::API.Services.JWT;
using Microsoft.AspNetCore.Identity;

public static class Extensions
{
    public static void AddServices(this IServiceCollection services)
    {
        services.AddScoped<IPasswordHasher<User>, PasswordHasher<User>>();
        services.AddScoped<IPasswordManager, PasswordManager>();
        services.AddScoped<IAuthService, AuthService>();
        services.AddScoped<ITokenService, TokenService>();
        services.AddScoped<IRepositoryHelperService, RepositoryHelperService>();
    }
}