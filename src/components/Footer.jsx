const Footer = () => {
  return (
    <footer className="border-t border-base-300 bg-base-100">
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-base-content/60">
        <p>
          © {new Date().getFullYear()} Tech
          <span className="text-primary font-semibold">Buddy</span> · Built by
          Dev Yadav
        </p>
        <nav className="flex gap-5">
          <a
            className="link link-hover"
            href="https://github.com/Dev-yadav2003/techbuddy-Frontend"
            target="_blank"
            rel="noreferrer"
          >
            Frontend
          </a>
          <a
            className="link link-hover"
            href="https://github.com/Dev-yadav2003/techbuddy"
            target="_blank"
            rel="noreferrer"
          >
            Backend
          </a>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
