namespace Cine.Contracts;

/// <summary>Actor data returned by the API, including their movies.</summary>
public sealed record ActorDto
{
    public int Id { get; init; }
    public required string Name { get; init; }
    /// <summary>Movies associated with this actor.</summary>
    public IReadOnlyList<MovieSummaryDto> Movies { get; init; } = Array.Empty<MovieSummaryDto>();
}