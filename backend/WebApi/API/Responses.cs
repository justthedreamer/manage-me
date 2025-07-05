namespace API.API;

public record AccessTokenResult
{
    public required string AccessToken { get; init; }
    public required string RefreshToken { get; init; }
}