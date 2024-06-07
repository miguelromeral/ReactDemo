import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../../providers/ThemeProvider';
import { MoonIcon, SunIcon } from '@heroicons/react/16/solid';

function Footer({onLanguageChange}) {

  const { theme, toggleTheme } = useTheme();
  const { t, i18n } = useTranslation();

  const languages = useMemo(() => [
    {
      lang: "es",
      flag: "https://upload.wikimedia.org/wikipedia/en/thumb/9/9a/Flag_of_Spain.svg/750px-Flag_of_Spain.svg.png"
    },
    {
      lang: "en",
      flag: "https://upload.wikimedia.org/wikipedia/commons/a/a5/Flag_of_the_United_Kingdom_%281-2%29.svg"
    },
  ], []);

  const isProd = process.env.REACT_APP_ENVIRONMENT === 'Production';
  const classFooterEnv = isProd ? 
  'bg-slate-800 text-slate-400' 
  :
  'bg-red-800 text-red-400'
    ;

  return (
    <footer className={`fixed h-4 bottom-0 w-full text-xs ${classFooterEnv} flex flex-row justify-between px-2`}>
      <span>MiguelRomeral</span>
        <div className='flex flex-wrap items-center'>
          {
            languages.map((lang) => 
              <div key={lang.lang} onClick={() => onLanguageChange(lang.lang)}
                className={`h-3 w-4 mx-1 rounded-md ${i18n.language == lang.lang ? 'opacity-50' : ''}`}>
                <img className='h-full w-full cursor-pointer' src={lang.flag} />
              </div>
            )
          }
        </div>
        
      <div className='flex flex-wrap items-center ml-2'>
        <div className='cursor-pointer' onClick={toggleTheme}>
          {
            theme === 'dark' &&
            <SunIcon className='h-4 w-4'/>
          }
          {
            theme === 'light' &&
            <MoonIcon className='h-4 w-4'/>
          }
        </div>
        <span className='ml-2'>
          {process.env.REACT_APP_VERSION}
        </span>
      </div>
    </footer>
  );
}

export default Footer;
