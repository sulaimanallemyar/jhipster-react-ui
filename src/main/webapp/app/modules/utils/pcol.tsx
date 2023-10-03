import React, { CSSProperties, FC } from 'react';
export const PCol: FC<{
  sm?: string;
  md?: string;
  lg?: string;
  col?: string;
  xl?: string;
  className?: string;
  style?: CSSProperties;
  children?: any;
}> = ({ children, sm, md, lg, xl, col, className, style }) => {
  const colClass = `col-${col}`;

  return (
    <div
      style={style}
      className={`${col ? colClass : 'col'} ${md ? 'md:col-' + md : ''} ${lg ? 'lg:col-' + lg : ''} ${xl ? 'xl:col-' + xl : ''} ${
        sm ? 'sm:col-' + sm : ''
      } ${className ? className : ''}`}
    >
      {children}
    </div>
  );
};

export default PCol;
