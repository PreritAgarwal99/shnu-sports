import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-page flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="eyebrow mb-3">404</p>
      <h1 className="text-4xl font-bold md:text-5xl">Out of bounds</h1>
      <p className="mt-4 max-w-md text-muted">
        We couldn&apos;t find that page. It may have been moved, or the link is incorrect.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/" className="btn-gold">Back to home</Link>
        <Link href="/cricket" className="btn-outline">Shop cricket</Link>
      </div>
    </div>
  );
}
