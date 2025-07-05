namespace API.Controllers;

using global::API.API;
using global::API.Services.Auth;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using LoginRequest = global::API.API.LoginRequest;

[ApiController]
[Route("api/auth")]
public class AuthController(IAuthService authService) : ControllerBase
{
    [HttpPost("login")]
    public async Task<ActionResult<AccessTokenResult>> Login([FromBody] LoginRequest loginRequest)
    {
        var accessTokens = await authService.LoginAsync(loginRequest);
        if (accessTokens is null)
        {
            return this.Unauthorized();
        }

        return this.Ok(accessTokens);
    }

    [HttpPost("refresh")]
    public ActionResult<AccessTokenResult> Refresh([FromBody] RefreshRequest refreshRequest)
    {
        var accessTokens = authService.RefreshTokens(refreshRequest.RefreshToken);

        if (accessTokens is null)
        {
            return this.Unauthorized();
        }

        return this.Ok(accessTokens);
    }
}