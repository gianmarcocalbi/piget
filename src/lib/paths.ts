const externalUrlPattern = /^(?:[a-z]+:)?\/\//i;

export function withBasePath(path: string): string {
  if (externalUrlPattern.test(path)) {
    return path;
  }

  const basePath = import.meta.env.BASE_URL.replace(/\/?$/, '/');
  const normalized = path.replace(/^\/+/, '');

  return normalized ? `${basePath}${normalized}` : basePath;
}
