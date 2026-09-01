import React, { createContext, useContext, useState, useEffect } from 'react';

const RouterContext = createContext({
  path: window.location.pathname || '/',
  navigate: () => {},
  params: {}
});

export const BrowserRouter = ({ children }) => {
  const [path, setPath] = useState(window.location.pathname || '/');

  useEffect(() => {
    const handlePopState = () => {
      setPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (to, options = {}) => {
    if (to === path) return;
    if (options.replace) {
      window.history.replaceState({}, '', to);
    } else {
      window.history.pushState({}, '', to);
    }
    setPath(to);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <RouterContext.Provider value={{ path, navigate, params: {} }}>
      {children}
    </RouterContext.Provider>
  );
};

export const useLocation = () => {
  const { path } = useContext(RouterContext);
  return { pathname: path };
};

export const useNavigate = () => {
  const { navigate } = useContext(RouterContext);
  return navigate;
};

export const useParams = () => {
  const { params } = useContext(RouterContext);
  return params;
};

function matchPath(pattern, path) {
  if (pattern === path) return { matched: true, params: {} };
  const patternParts = pattern.split('/').filter(Boolean);
  const pathParts = path.split('/').filter(Boolean);

  if (patternParts.length !== pathParts.length) return { matched: false, params: {} };

  const params = {};
  for (let i = 0; i < patternParts.length; i++) {
    if (patternParts[i].startsWith(':')) {
      const paramName = patternParts[i].slice(1);
      params[paramName] = pathParts[i];
    } else if (patternParts[i] !== pathParts[i]) {
      return { matched: false, params: {} };
    }
  }
  return { matched: true, params };
}

export const Routes = ({ children }) => {
  const { path } = useContext(RouterContext);
  let matchedChild = null;
  let matchedParams = {};

  React.Children.forEach(children, (child) => {
    if (matchedChild) return;
    if (React.isValidElement(child)) {
      const { path: routePath, element } = child.props;
      if (routePath === '*') {
        matchedChild = element;
      } else {
        const result = matchPath(routePath, path);
        if (result.matched) {
          matchedChild = element;
          matchedParams = result.params;
        }
      }
    }
  });

  return (
    <RouterContext.Provider value={{ path, navigate: useContext(RouterContext).navigate, params: matchedParams }}>
      {matchedChild}
    </RouterContext.Provider>
  );
};

export const Route = ({ path, element }) => {
  return element;
};

export const Link = ({ to, children, className = '', ...props }) => {
  const navigate = useNavigate();
  const handleClick = (e) => {
    e.preventDefault();
    navigate(to);
  };

  return (
    <a href={to} onClick={handleClick} className={className} {...props}>
      {children}
    </a>
  );
};

export const NavLink = ({ to, children, className = '', activeClassName = 'active', ...props }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isActive = pathname === to;

  const handleClick = (e) => {
    e.preventDefault();
    navigate(to);
  };

  const computedClassName = typeof className === 'function' 
    ? className({ isActive }) 
    : `${className} ${isActive ? activeClassName : ''}`;

  return (
    <a href={to} onClick={handleClick} className={computedClassName} {...props}>
      {children}
    </a>
  );
};
