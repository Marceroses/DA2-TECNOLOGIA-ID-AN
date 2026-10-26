namespace Cine.Domain;

public sealed record Actor
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public List<Movie> Movies { get; set; } = [];
}