// lib/github.ts

export interface GitHubStats {
  public_repos: number;
  followers: number;
  lastCommitMessage: string;
  lastCommitDate: string;
}

export async function getGitHubStats(username: string): Promise<GitHubStats | null> {
  try {
    // 1. Fetch user profile
    const userRes = await fetch(`https://api.github.com/users/${username}`, {
      next: { revalidate: 3600 } // Cache for 1 hour
    });
    if (!userRes.ok) return null;
    const userData = await userRes.json();

    // 2. Fetch latest events for the last commit message
    const eventsRes = await fetch(`https://api.github.com/users/${username}/events/public`, {
      next: { revalidate: 300 } // Cache for 5 mins
    });
    
    let lastCommitMessage = "Building something awesome...";
    let lastCommitDate = "";

    if (eventsRes.ok) {
      const events = await eventsRes.json();
      const pushEvent = events.find((e: any) => e.type === 'PushEvent');
      if (pushEvent && pushEvent.payload.commits && pushEvent.payload.commits.length > 0) {
        lastCommitMessage = pushEvent.payload.commits[0].message;
        lastCommitDate = pushEvent.created_at;
      }
    }

    return {
      public_repos: userData.public_repos,
      followers: userData.followers,
      lastCommitMessage,
      lastCommitDate
    };
  } catch (error) {
    console.error('GitHub fetch error:', error);
    return null;
  }
}
