// Mirrors Cine.Contracts.MovieDto / ActorSummaryDto from the backend.
export interface ActorSummary {
  id: number;
  name: string;
}

export interface Movie {
  id: number;
  title: string;
  stars: number;
  actors: ActorSummary[];
}
