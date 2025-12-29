export default function Loading() {
  return (
    <div className="loading-overlay" role="status" aria-label="Loading">
      <div className="loader" role="presentation" aria-hidden="true">
        <span className="bar" />
        <span className="bar" />
        <span className="bar" />
      </div>
    </div>
  );
}
