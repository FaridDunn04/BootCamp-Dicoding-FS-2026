function NoticeBanner({ type, message }) {
  if (!message) {
    return null;
  }

  return (
    <div className={`notice ${type === 'error' ? 'is-error' : 'is-success'}`}>
      {message}
    </div>
  );
}

export default NoticeBanner;
