function Footer() {

  const isProd = process.env.REACT_APP_ENVIRONMENT === 'Production';
  const classFooterEnv = isProd ? 
  'bg-slate-800 text-slate-400' 
  :
  'bg-red-800 text-red-400'
    ;

  return (
    <footer className={`fixed bottom-0 w-full text-xs ${classFooterEnv} flex flex-row justify-between px-2`}>
      <span>MiguelRomeral</span>
      <span>{process.env.REACT_APP_VERSION}</span>
    </footer>
  );
}

export default Footer;
