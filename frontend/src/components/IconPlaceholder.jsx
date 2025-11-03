const IconPlaceholder = ({ label, svg }) => {
  if (svg) {
    return <img src={svg} alt={label} className="icon" />;
  }

  return (
    <span className="icon-placeholder" aria-hidden="true">
      {label}
    </span>
  );
};

export default IconPlaceholder;
