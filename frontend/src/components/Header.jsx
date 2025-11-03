import { Link } from 'react-router-dom';
import IconPlaceholder from './IconPlaceholder';
import CheckroomIcon from '../assets/icons/checkroom.svg';
import ShoppingBagIcon from '../assets/icons/shopping_bag.svg';
import AccountIcon from '../assets/icons/account_circle.svg';

const Header = ({ breadcrumbs }) => (
  <header className="top-bar">
    <nav className="top-bar__breadcrumbs" aria-label="Breadcrumb">
      {breadcrumbs.map(({ label, active, to }) => {
        const className = `breadcrumb${
          active ? ' breadcrumb--active' : ''
        }${to ? ' breadcrumb--link' : ''}`;
        const commonProps = {
          className,
          'aria-current': active ? 'page' : undefined,
        };

        if (to) {
          return (
            <Link key={label} to={to} {...commonProps}>
              {label}
            </Link>
          );
        }

        return (
          <span key={label} {...commonProps}>
            {label}
          </span>
        );
      })}
    </nav>
    <Link to="/" className="brand" aria-label="Go to Tensyr home">
      Tensyr
    </Link>
    <div className="top-bar__icons">
      <IconPlaceholder label="Closet" svg={CheckroomIcon} />
      <IconPlaceholder label="Bag" svg={ShoppingBagIcon} />
      <IconPlaceholder label="Account" svg={AccountIcon} />
    </div>
  </header>
);

export default Header;
