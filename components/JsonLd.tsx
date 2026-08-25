import React from "react";

/**
 * Renders a JSON-LD <script type="application/ld+json">. Kept as a server
 * component (no "use client") so the structured data is present in SSR HTML.
 */
export default function JsonLd({ data }: { data: object | object[] }) {
  // Escape `<`/`>` so no string value (e.g. an artist name) can break out of
  // the <script> element via a literal `</script>` sequence. Data is author-
  // controlled here, but this is the canonical safe pattern.
  const html = JSON.stringify(data).replace(/</g, "\\u003c").replace(/>/g, "\\u003e");
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}