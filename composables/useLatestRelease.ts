interface LatestRelease {
  tag: string | null
  url: string | null
}

export function useLatestRelease() {
  return useAsyncData<LatestRelease>(
    'github-latest-release',
    async () => {
      try {
        const res = await $fetch<{ tag_name?: string; html_url?: string }>(
          'https://api.github.com/repos/kite-plus/kite/releases/latest',
          {
            headers: { Accept: 'application/vnd.github+json' },
            timeout: 5000,
            retry: 0,
          },
        )
        return {
          tag: res?.tag_name ?? null,
          url: res?.html_url ?? null,
        }
      }
      catch {
        return { tag: null, url: null }
      }
    },
    {
      default: () => ({ tag: null, url: null }),
    },
  )
}
