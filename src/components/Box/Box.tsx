import React from 'react';
import './Box.scss';

interface IBoxProps {
    className?: string;
    children: React.ReactNode;
}

const Box = ({ className, children }: IBoxProps): JSX.Element => {
    return (
        <article className={`box ${className}`}>
            {children}
        </article>
    );
};

export default Box;
