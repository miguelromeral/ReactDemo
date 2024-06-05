import {
  Bars3Icon,
  HomeIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/16/solid";
import logo from "../../assets/images/logo512.png";

function NavBar() {
  return (
    <nav className="bg-blue-700 text-white flex justify-between">
      <div className="flex flex-row justify-between w-full">
        <ul>
          <li className="px-2 py-2 transition ease-in-out  hover:bg-blue-200 hover:text-blue-900">
            <a href="/" className="flex flex-row justify-center flex-nowrap">
              <img src={logo} className="h-6" />
              <span className="px-2">React APP</span>
            </a>
          </li>
        </ul>
        <div
          id="navBarMenu"
          className="hidden sm:flex"
        >
          <ul className="flex flex-col sm:flex-row">
            <li className="px-2 py-2 transition ease-in-out  hover:bg-blue-200 hover:text-blue-900">
              <a href="/" className="flex flex-row justify-center flex-nowrap">
                <div className="h-auto flex flex-col justify-center pr-1">
                  <HomeIcon className="h-5" />
                </div>
                <span>Inicio</span>
              </a>
            </li>
            <li className="px-2 py-2 transition ease-in-out  hover:bg-blue-200 hover:text-blue-900">
              <a
                href="/movies"
                className="flex flex-row justify-center flex-nowrap"
              >
                <div className="h-auto flex flex-col justify-center pr-1">
                  <MagnifyingGlassIcon className="h-5" />
                </div>
                <span>Movies</span>
              </a>
            </li>
            <li className="px-2 py-2 transition ease-in-out  hover:bg-blue-200 hover:text-blue-900">
              <a
                href="/shows"
                className="flex flex-row justify-center flex-nowrap"
              >
                <div className="h-auto flex flex-col justify-center pr-1">
                  <MagnifyingGlassIcon className="h-5" />
                </div>
                <span>TV Shows</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="px-2 py-2 block sm:hidden transition ease-in-out bg-blue-700 hover:bg-blue-200 text-white hover:text-blue-900">
        <Bars3Icon
          className="h-6 cursor-pointer"
          onClick={() => {
            document.getElementById("navBarMenu").classList.toggle("hidden");
          }}
        />
      </div>
    </nav>
  );
}

export default NavBar;
