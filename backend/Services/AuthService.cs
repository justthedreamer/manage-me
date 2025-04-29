namespace backend.Services;

using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using backend.Lib;
using backend.Mocks;
using backend.Model;
using Microsoft.IdentityModel.Tokens;

public class AuthService
{
    private List<User> users = UsersMock.Users.ToList();

    private Dictionary<string, User> RefreshTokenUserLogin = new();

    public User? LoginUser(LoginRequest request)
    {
        return this.users.FirstOrDefault(u => u.Login == request.Login && u.Password == request.Password);
    }

    public User? GetUserById(Guid Id)
    {
        return this.users.FirstOrDefault(u => u.Id == Id);
    }

    public void SetRefreshToken(User user, string refreshToken)
    {
        this.RefreshTokenUserLogin[refreshToken] = user;
    }

    public void RenewRefreshTokens(string oldToken, string newToken, User user)
    {
        this.RefreshTokenUserLogin.Remove(oldToken);
        this.RefreshTokenUserLogin[newToken] = user;
    }

    public User? GetUserByRefreshToken(string reqRefreshToken)
    {
        return this.RefreshTokenUserLogin.GetValueOrDefault(reqRefreshToken);
    }
}