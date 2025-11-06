import React from "react";

interface IconButtonProps {
  label?: string;
  icon?: React.FC<React.SVGProps<SVGSVGElement>>;
  onClick?: () => void;
  className?: string;
}

const IconButton: React.FC<IconButtonProps> = ({ label, icon: Icon, onClick, className }) => {
  return (
    <button className={`icon-button ${className || ""}`} onClick={onClick}>
      {Icon && <Icon className="icon" />}
      {label && <span>{label}</span>}
    </button>
  );
};

export default IconButton;