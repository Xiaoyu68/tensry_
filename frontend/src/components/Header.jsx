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
    <nav className="top-bar__icons" aria-label="Supplementary navigation">
      <Link to="/recommendations" aria-label="Go to AI Stylist input">
        <IconPlaceholder label="Closet" svg={CheckroomIcon} />
      </Link>
      <Link to="/ai-recommendations" aria-label="Go to AI recommendations">
        <IconPlaceholder label="Bag" svg={ShoppingBagIcon} />
      </Link>
      <Link to="/login" aria-label="Go to login">
        <IconPlaceholder label="Account" svg={AccountIcon} />
      </Link>
    </nav>
  </header>
);

export default Header;
