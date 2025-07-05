namespace API.DTO.Requests.Task;

using System.ComponentModel.DataAnnotations;
using global::API.Database.Entities.Enums;
using global::API.Database.Entities.Tasks;
using MongoDB.Bson.Serialization.Attributes;

public record UpdateTaskDto
{
    [Required]
    public string Name { get; set; }

    [Required]
    public string Description { get; set; }

    [Required]
    public Priority Priority { get; set; }

    [Required]
    [Range(0, int.MaxValue, ErrorMessage = "Estimated Finish Time Hours must be greater than or equal to 0.")]
    public int EstimatedFinishTimeHours { get; set; }
}