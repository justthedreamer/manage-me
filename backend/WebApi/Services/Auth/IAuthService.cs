namespace API.Services.Auth;

using global::API.API;

public interface IAuthService
{
    public Task<AccessTokenResult?> LoginAsync(LoginRequest request);

    public AccessTokenResult? RefreshTokens(string oldToken);
}