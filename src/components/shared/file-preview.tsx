import { addHTTPPrefix } from "@/utils/image-loader";

function FilePreview({
  fileUrl,
  mimeType,
}: {
  fileUrl: string;
  mimeType: string;
}) {
  if (mimeType === "application/pdf") {
    return <iframe src={addHTTPPrefix(fileUrl)} className="w-full h-full" />;
  }

  if (mimeType.includes("image")) {
    return (
      <img
        src={addHTTPPrefix(fileUrl)}
        alt="Preview"
        className="w-full h-full object-cover"
      />
    );
  }

  if (
    mimeType.includes("msword") ||
    mimeType.includes("officedocument") ||
    mimeType.includes("spreadsheet")
  ) {
    return (
      <iframe
        src={`https://docs.google.com/gview?url=${encodeURIComponent(
          fileUrl
        )}&embedded=true`}
        className="w-full h-full"
        title="Doc Preview"
      />
    );
  }

  return (
    <a
      href={fileUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-600 underline"
    >
      Download File
    </a>
  );
}

export default FilePreview;
