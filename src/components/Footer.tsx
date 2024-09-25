function Footer() {
  return (
    <footer className="footer has-background-link-dark">
      <div className="content has-text-centered has-text-white-ter">
        <p>
          Copyright &copy;{" "}
          <a href="https://github.com/ladeoshodi"> Lade Oshodi</a>{" "}
          {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}

export default Footer;
