import { PortableText, type PortableTextComponents } from "@portabletext/react";

const components: PortableTextComponents = {
  block: {
    h2: ({ children }) => <h2 className="mt-8 text-2xl font-bold">{children}</h2>,
    h3: ({ children }) => <h3 className="mt-6 text-xl font-semibold">{children}</h3>,
    normal: ({ children }) => <p className="mt-4 leading-relaxed text-muted">{children}</p>,
    blockquote: ({ children }) => (
      <blockquote className="mt-4 border-l-2 border-gold pl-4 italic text-foreground">{children}</blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="mt-4 list-disc space-y-1.5 pl-5 text-muted">{children}</ul>,
    number: ({ children }) => <ol className="mt-4 list-decimal space-y-1.5 pl-5 text-muted">{children}</ol>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
    link: ({ children, value }) => (
      <a href={value?.href} className="text-gold underline hover:text-gold-bright" rel="noopener noreferrer">
        {children}
      </a>
    ),
  },
};

export function PortableBody({ value }: { value: unknown[] }) {
  if (!value?.length) return null;
  // @portabletext/react expects its own block type; our content matches at runtime.
  return <PortableText value={value as never} components={components} />;
}
