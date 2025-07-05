namespace API.Services.JWT;

using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using global::API.Auth;
using global::API.Database.Entities;
using global::API.Database.Entities.Enums;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

public class TokenService(IOptions<AuthOptions> authOptions) : ITokenService
{
    public string GenerateRefreshToken() => Guid.NewGuid().ToString();

    public string GenerateJwt(User user) => this.GenerateJwt(user.Login, user.Name, user.Role);

    private string GenerateJwt(string login, string name, Role role)
    {
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(authOptions.Value.SigningKey));

        var claims = new[]
        {
            new Claim(ClaimTypes.NameIdentifier, login),
            new Claim(ClaimTypes.Name, name),
            new Claim("role", role.ToString()),
        };

        var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
        var token = new JwtSecurityToken(
            authOptions.Value.Issuer, authOptions.Value.Audience, claims,
            expires: DateTime.UtcNow.AddMinutes(15),
            signingCredentials: credentials);

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}