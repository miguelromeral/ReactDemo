import { Bars3Icon, HomeIcon, MagnifyingGlassIcon } from "@heroicons/react/16/solid";

function NavBar(){

  return (
    <nav className="bg-blue-700 text-white flex justify-between">
      <div>
        <ul id="navBarMenu" className="hidden sm:flex flex-row flex-wrap transition ease-in-out">
          <li className="px-2 py-2 transition ease-in-out  hover:bg-blue-200 hover:text-blue-900">
            <a href="/" className="flex flex-row justify-center flex-nowrap">
              <div className="h-auto flex flex-col justify-center pr-1">
                <HomeIcon className="h-5" />
              </div>
              <span>Inicio</span>
            </a>
          </li>
          <li className="px-2 py-2 transition ease-in-out  hover:bg-blue-200 hover:text-blue-900">
            <a href="/search" className="flex flex-row justify-center flex-nowrap">
              <div className="h-auto flex flex-col justify-center pr-1">
                <MagnifyingGlassIcon className="h-5" />
              </div>
              <span>Buscar</span>
            </a>
          </li>
        </ul>
      </div>
      <div className="px-2 py-2 block sm:hidden transition ease-in-out bg-blue-700 hover:bg-blue-200 text-white hover:text-blue-900">
        <Bars3Icon 
          className="h-6 cursor-pointer" 
          onClick={() => { document.getElementById("navBarMenu").classList.toggle('hidden') }} />
      </div>
    </nav>
  )
}


export default NavBar;