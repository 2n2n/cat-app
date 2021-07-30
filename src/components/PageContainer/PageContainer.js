import React from 'react';
import { Container } from 'react-bootstrap';

const PageContainer = ({ children, ...rest }) => {
    return (
        <div {...rest}>
        <Container>
            {children}
        </Container>
      </div>
    );
}

export default PageContainer;