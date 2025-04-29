namespace backend.Auth;

using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using backend.Lib;
using backend.Model;
using Microsoft.IdentityModel.Tokens;

public class JWT
{
    public static string GenerateRefreshToken() => Guid.NewGuid().ToString();

    public static string GenerateJwt(User user, IConfiguration configuration)
    {
        var authOptions = new AuthOptions();
        configuration.GetSection("auth").Bind(authOptions);

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(authOptions.SigningKey));

        var claims = new[]
        {
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim(ClaimTypes.Name, user.Name),
            new Claim("role", user.Role.ToString())
        };

        var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
        var token = new JwtSecurityToken(
            authOptions.Issuer, authOptions.Audience, claims,
            expires: DateTime.UtcNow.AddMinutes(15),
            signingCredentials: credentials);

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}