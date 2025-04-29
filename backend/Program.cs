using System.Security.Claims;
using backend.Auth;
using backend.DTO;
using backend.Extensions;
using backend.Model;
using backend.Services;
using Microsoft.AspNetCore.Identity.Data;
using LoginRequest = backend.Model.LoginRequest;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddAuth(builder.Configuration);
builder.Services.AddAuthorization();

var app = builder.Build();

var authService = new AuthService();

app.MapPost("/login", (LoginRequest req) =>
{
    var user = authService.LoginUser(req);

    if (user is null)
    {
        return Results.Unauthorized();
    }

    var accessToken = JWT.GenerateJwt(user, builder.Configuration);
    var refreshToken = JWT.GenerateRefreshToken();

    authService.SetRefreshToken(user, refreshToken);

    return Results.Ok(new TokenResponse(accessToken, refreshToken));
});

app.MapPost("/refresh", (RefreshRequest req) =>
{
    var user = authService.GetUserByRefreshToken(req.RefreshToken);

    if (user is null)
    {
        return Results.Unauthorized();
    }

    var newAccessToken = JWT.GenerateJwt(user, builder.Configuration);
    var newRefreshToken = JWT.GenerateRefreshToken();
    authService.RenewRefreshTokens(req.RefreshToken, newRefreshToken, user);

    return Results.Ok(new TokenResponse(newAccessToken, newRefreshToken));
});

app.MapGet("/me", (ClaimsPrincipal userClaims) =>
{
    var userId = userClaims.FindFirst(ClaimTypes.NameIdentifier)?.Value;
    if (userId is null)
        return Results.Unauthorized();

    var user = authService.GetUserById(Guid.Parse(userId));

    if (user is null)
        return Results.Unauthorized();

    var response = UserDto.FromUser(user);
    return Results.Ok(response);
}).RequireAuthorization();

app.UseAuthentication();
app.UseAuthorization();
app.Run();