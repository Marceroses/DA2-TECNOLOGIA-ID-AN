namespace Cine.Contracts;

/// <summary>Actor identity included in a movie response.</summary>
public sealed record ActorSummaryDto(int Id, string Name);