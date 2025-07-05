namespace API.Services.JWT;

using global::API.Database.Entities;

public interface ITokenService
{
    string GenerateRefreshToken();
    
    string GenerateJwt(User user);
}