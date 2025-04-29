namespace backend.Lib;

public class AuthOptions
{
    public string Issuer { get; set; }
    public string Audience { get; set; }
    public TimeSpan Expiry { get; set; }
    public string SigningKey { get; set; }
}