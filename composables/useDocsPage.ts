export function useDocsPage(path: MaybeRefOrGetter<string>) {
  const pathRef = computed(() => toValue(path))

  return useAsyncData(
    () => `docs-${pathRef.value}`,
    () => queryCollection('docs').path(pathRef.value).first(),
    {
      watch: [pathRef],
    },
  )
}
