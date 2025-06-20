export const blurImage = () => {
  const image = `<svg height="100" width="100" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="f1" x="0" y="0" xmlns="http://www.w3.org/2000/svg">
      <feGaussianBlur in="SourceGraphic" stdDeviation="15" />
    </filter>
  </defs>
  <rect width="100%" height="100%" fill="#D1D2D9" filter="url(#f1)" />
</svg>`;
  const toBase = (image: string) =>
    typeof window === "undefined"
      ? Buffer.from(image).toString("base64")
      : window.btoa(image);
  return `data:image/svg+xml;base64,${toBase(image)}`;
};

export const addHTTPPrefix = (url: string) => {
  if (!url?.startsWith("http://") && !url?.startsWith("https://")) {
    return `${import.meta.env.VITE_API_URL}/public${url}`;
  }
  return url;
};
