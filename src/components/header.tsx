import { NavLink } from './nav-link'

export function Header() {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center gap-6 px-6">
        <nav className="flex items-center space-x-4 lg:space-x-6">
          <NavLink to="/">Inicio</NavLink>
          <NavLink to="/download-bills">Download de contas</NavLink>
          <NavLink to="/registry-bills">Cadastro de contas</NavLink>
        </nav>
      </div>
    </div>
  )
}
