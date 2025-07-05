namespace API.Extensions;

using Microsoft.AspNetCore.Cors.Infrastructure;

public static class AllowFrontendCorsPolicy
{
    public const string POLICY_NAME = "AllowFrontendCorsPolicy";

    public static Action<CorsOptions> Configure => options => options.AddPolicy(POLICY_NAME,
        policyBuilder =>
        {
            policyBuilder
                .WithOrigins("http://localhost:5174")
                .AllowAnyHeader()
                .AllowAnyMethod()
                .AllowCredentials()
                .Build();
        });
}