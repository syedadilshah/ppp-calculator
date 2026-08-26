import Link from "next/link";

export default function NotFound() {
  return (
    <section className="hero">
      <div className="container reading">
        <div className="eyebrow">404</div>
        <h1>Page not found</h1>
        <p>The page you requested does not exist. Return to the main PPP Calculator to start a comparison.</p>
        <p><Link href="/">Use PPP Calculator →</Link></p>
      </div>
    </section>
  );
}
