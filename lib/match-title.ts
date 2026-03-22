export type MatchTitleInput = {
  match_name?: string | null;
  team_name?: string | null;
  opponent?: string | null;
};

export function getMatchTitle(input: MatchTitleInput): string {
  const matchName = input.match_name?.trim();
  if (matchName) {
    return matchName;
  }

  const teamName = input.team_name?.trim();
  const opponent = input.opponent?.trim();
  if (teamName && opponent) {
    return `${teamName} vs ${opponent}`;
  }

  return "Untitled Match";
}

export function getReelTitle(title?: string | null): string {
  const trimmedTitle = title?.trim();
  return trimmedTitle ? trimmedTitle : "Highlight Reel";
}
