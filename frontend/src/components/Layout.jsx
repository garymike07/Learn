import { useState } from 'react'
import { Link, useLocation, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { 
  Menu, 
  X, 
  Home, 
  BookOpen, 
  Briefcase, 
  User, 
  Mail,
  LogIn,
  UserPlus,
  LogOut,
  Settings,
  BarChart3
} from 'lucide-react'

const Layout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const { user, logout, isAuthenticated, isAdmin } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/')
    setIsUserMenuOpen(false)
  }

  const navigation = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Courses', href: '/courses', icon: BookOpen },
    { name: 'Career Guidance', href: '/career', icon: Briefcase },
    { name: 'About', href: '/about', icon: User },
    { name: 'Contact', href: '/contact', icon: Mail },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <img 
                src="/src/assets/logo.svg" 
                alt="Mike Learning App" 
                className="h-8 w-8"
              />
              <span className="text-xl font-bold gradient-text">
                Mike Learning
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive(item.href)
                        ? 'text-primary bg-primary/10'
                        : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Link>
                )
              })}
            </div>

            {/* User Actions */}
            <div className="hidden md:flex items-center space-x-4">
              {isAuthenticated ? (
                <div className="relative">
                  <Button variant="ghost" size="sm" onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}>
                    <User className="h-4 w-4 mr-2" />
                    {user?.first_name}
                  </Button>
                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-md shadow-lg z-50">
                      <div className="p-2">
                        <p className="text-sm font-medium text-foreground truncate">{user?.first_name} {user?.last_name}</p>
                        <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
                      </div>
                      <hr className="border-border" />
                      <div className="p-1">
                        <Link to="/dashboard" className="flex items-center w-full p-2 text-sm text-muted-foreground hover:bg-muted rounded-md" onClick={() => setIsUserMenuOpen(false)}>
                          <BookOpen className="w-4 h-4 mr-2" />
                          Dashboard
                        </Link>
                        {isAdmin && (
                          <Link to="/admin" className="flex items-center w-full p-2 text-sm text-muted-foreground hover:bg-muted rounded-md" onClick={() => setIsUserMenuOpen(false)}>
                            <BarChart3 className="w-4 h-4 mr-2" />
                            Admin Panel
                          </Link>
                        )}
                        <button onClick={handleLogout} className="flex items-center w-full p-2 text-sm text-red-500 hover:bg-muted rounded-md">
                          <LogOut className="w-4 h-4 mr-2" />
                          Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <Button asChild variant="ghost" size="sm">
                    <Link to="/login">
                      <LogIn className="h-4 w-4 mr-2" />
                      Login
                    </Link>
                  </Button>
                  <Button asChild size="sm">
                    <Link to="/register">
                      <UserPlus className="h-4 w-4 mr-2" />
                      Sign Up
                    </Link>
                  </Button>
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium transition-colors ${
                      isActive(item.href)
                        ? 'text-primary bg-primary/10'
                        : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.name}</span>
                  </Link>
                )
              })}
              <div className="pt-4 border-t border-border space-y-2">
                {isAuthenticated ? (
                  <>
                    <div className="px-3 mb-2">
                      <p className="text-base font-medium text-foreground">{user?.first_name} {user?.last_name}</p>
                      <p className="text-sm text-muted-foreground">{user?.email}</p>
                    </div>
                    <Link to="/dashboard" className="flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium text-muted-foreground hover:bg-accent" onClick={() => setIsMenuOpen(false)}>
                      <BookOpen className="h-5 w-5" />
                      <span>Dashboard</span>
                    </Link>
                    {isAdmin && (
                      <Link to="/admin" className="flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium text-muted-foreground hover:bg-accent" onClick={() => setIsMenuOpen(false)}>
                        <BarChart3 className="h-5 w-5" />
                        <span>Admin Panel</span>
                      </Link>
                    )}
                    <button onClick={() => { handleLogout(); setIsMenuOpen(false); }} className="flex items-center w-full space-x-2 px-3 py-2 rounded-md text-base font-medium text-red-500 hover:bg-accent">
                      <LogOut className="h-5 w-5" />
                      <span>Sign Out</span>
                    </button>
                  </>
                ) : (
                  <>
                    <Button asChild variant="ghost" className="w-full justify-start">
                      <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                        <LogIn className="h-4 w-4 mr-2" />
                        Login
                      </Link>
                    </Button>
                    <Button asChild className="w-full justify-start">
                      <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                        <UserPlus className="h-4 w-4 mr-2" />
                        Sign Up
                      </Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card/30 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <Link to="/" className="flex items-center space-x-2 mb-4">
                <img 
                  src="/src/assets/logo.svg" 
                  alt="Mike Learning App" 
                  className="h-8 w-8"
                />
                <span className="text-xl font-bold gradient-text">
                  Mike Learning
                </span>
              </Link>
              <p className="text-muted-foreground mb-4">
                Master new skills with our comprehensive learning platform. 
                From web development to AI, we've got you covered.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-muted-foreground hover:text-foreground">
                  Twitter
                </a>
                <a href="#" className="text-muted-foreground hover:text-foreground">
                  LinkedIn
                </a>
                <a href="#" className="text-muted-foreground hover:text-foreground">
                  GitHub
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <Link 
                      to={item.href}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2025 Mike Learning App. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Layout

