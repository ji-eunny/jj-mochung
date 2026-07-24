/**
 * GitHub Pages 등 basePath 가 있을 때 public 자산 경로를 붙인다.
 * 예: assetPath("/images/a.png") → "/jj-mochung/images/a.png"
 */
export function assetPath(path: string): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  if (!path) return base || "/";
  if (path.startsWith("http://") || path.startsWith("https://") || path.startsWith("//")) {
    return path;
  }
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalized}`;
}
