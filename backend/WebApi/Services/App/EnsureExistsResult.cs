namespace API.Services.App;

public class EnsureExistsResult
{
    public bool Error { get; private set; }
    public string? Message { get; private set; }

    public void SetError(string message)
    {
        this.Error = true;
        this.Message = message;
    }
}