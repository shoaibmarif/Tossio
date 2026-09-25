import './Footer.css';

export function Footer() {
  return (
    <footer className="footer">
      <p className="footer__text">
        © {new Date().getFullYear()} Coin Flip Online. All results are randomly generated in your browser.
      </p>
    </footer>
  );
}
