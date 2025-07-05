namespace API.API;

public record LoginRequest(string Login, string Password);

public record GetUsersByRolesRequest(bool IsDevops, bool IsDeveloper, string? SearchingPhrase = null);