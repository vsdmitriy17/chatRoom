import styled from 'styled-components';

export const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ color = 'rgba(17, 17, 17, 0.6)' }) => color};

  backdrop-filter: ${({ filter }) => (filter ? 'blur(10px)' : 'blur(0)')};
`;

export const StyledModal = styled.div`
  max-width: calc(100vw - 20px);
  max-height: calc(100vh - 20px);
  overflow: auto;
`;
