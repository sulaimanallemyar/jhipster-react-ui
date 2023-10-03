import React, { CSSProperties, FC } from 'react';

export const PRow: FC<{ justify?: string; style?: CSSProperties; className?: string; children?: any }> = ({
  children,
  justify,
  style,
  className,
}) => {
  return (
    <div style={style} className={` row grid${justify ? ' justify-' + justify : ''}${className ? ' ' + className : ''}`}>
      {children}
    </div>
  );
};

export default PRow;
