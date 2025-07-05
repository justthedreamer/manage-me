namespace API.Services.Auth;

using System.Security.Authentication;
using global::API.API;
using global::API.Database.Entities;
using global::API.Database.Repositories;
using global::API.Database.Repositories.Interfaces;
using global::API.Security;
using global::API.Services.JWT;
using Microsoft.AspNetCore.Identity;

public class AuthService(
    ITokenService tokenService,
    IUserRepository userRepository,
    IPasswordManager passwordManager) : IAuthService
{
    private readonly Dictionary<string, User> _refreshTokenUserLogin = new();

    public async Task<AccessTokenResult?> LoginAsync(LoginRequest request)
    {
        var user = await userRepository.GetUserByLoginAsync(request.Login);
        if (user is null)
        {
            return null;
        }

        if (!passwordManager.Validate(user.PasswordHash, request.Password))
        {
            throw new InvalidCredentialException();
        }

        var token = tokenService.GenerateJwt(user);
        var refreshToken = tokenService.GenerateRefreshToken();

        this._refreshTokenUserLogin.Add(refreshToken, user);

        return new AccessTokenResult
        {
            AccessToken = token,
            RefreshToken = refreshToken,
        };
    }

    public AccessTokenResult? RefreshTokens(string oldToken)
    {
        var exists = this._refreshTokenUserLogin.TryGetValue(oldToken, out var user);
        if (!exists)
        {
            return null;
        }

        var newAccessToken = tokenService.GenerateJwt(user);
        var newRefreshToken = tokenService.GenerateRefreshToken();

        this._refreshTokenUserLogin.Remove(oldToken);
        this._refreshTokenUserLogin.Add(newRefreshToken, user);

        return new AccessTokenResult
        {
            AccessToken = newAccessToken,
            RefreshToken = newRefreshToken,
        };
    }
}