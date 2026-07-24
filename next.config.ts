import type { NextConfig } from "next";

/** GitHub Pages 프로젝트 사이트용 저장소 이름 */
const REPO_NAME = "jj-mochung";
const isGhPages = process.env.GITHUB_PAGES === "true";
const basePath = isGhPages ? `/${REPO_NAME}` : "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  assetPrefix: basePath ? `${basePath}/` : undefined,
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
