import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {
  Form as FormicForm,
  Field,
  ErrorMessage as ErrorFormicError,
} from 'formik';
import { FaEye } from 'react-icons/fa';
import { FaEyeSlash } from 'react-icons/fa';

export const Wraper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  background-color: ${p => p.theme.colors.transparent};

  @media screen and (min-width: 768px) {
    width: 608px;
    padding-top: 60px;
    padding-bottom: 60px;

    background-color: ${p => p.theme.colors.regModBack};
    box-shadow: ${p => p.theme.shadows.regModalShadow};
    border-radius: ${p => p.theme.radii.large};
  }
  @media screen and (min-width: 1280px) {
    width: 618px;
  }
`;

export const ButtonWraper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 40px;
  margin-top: 40px;
`;

export const LinkWraper = styled.div`
  display: flex;
  justify-content: center;
`;

export const LinkText = styled.p`
  margin-right: 6px;
  font-family: 'Manrope';
  font-size: ${p => p.theme.fontSizes.xs};
  letter-spacing: 0.04em;
  color: ${p => p.theme.colors.regModalLinkText};
`;

export const NavLink = styled(Link)`
  font-family: 'Manrope';
  font-size: ${p => p.theme.fontSizes.xs};
  letter-spacing: 0.04em;
  color: ${p => p.theme.colors.regModalLink};
`;

export const StyledButton = styled.button`
  width: 280px;
  height: 44px;

  background-color: ${p => p.theme.colors.regModalActiveBtn};
  color: ${p => p.theme.colors.white};
  border-radius: ${p => p.theme.radii.large};
  border: none;
  cursor: pointer;

  @media screen and (min-width: 768px) {
    width: 448px;
  }
  &:hover {
    border: 2px solid #f59256;
    background-color: transparent;
    color: ${p => p.theme.colors.black};
  }
  &:active {
    border: 2px solid #f59256;
    background-color: transparent;
    color: ${p => p.theme.colors.black};
  }
`;

export const Form = styled(FormicForm)`
  display: flex;
  flex-direction: column;
  margin-left: auto;
  margin-right: auto;
`;

export const Input = styled(Field)`
  color: ${p => p.theme.colors.black};
  width: 280px;
  background-color: ${p => p.theme.colors.bgc};
  border: 1px solid rgba(245, 146, 86, 0.5);
  border-radius: ${p => p.theme.radii.large};
  padding-top: 11px;
  padding-bottom: 11px;
  padding-left: 14px;
  outline: none;

  @media screen and (min-width: 768px) {
    width: 448px;
    padding-left: 32px;
    padding-top: 14px;
    padding-bottom: 14px;
  }

  @media screen and (min-width: 1280px) {
    width: 458px;
  }

  ::placeholder {
    color: ${p => p.theme.colors.regModalplaceholderColor};
    font-size: ${p => p.theme.fontSizes.s};
  }
`;

export const ErrorMessage = styled(ErrorFormicError)`
  position: absolute;
  color: ${p => p.theme.colors.error};
  top: 37px;
  left: 15px;

  font-size: ${p => p.theme.fontSizes.s};

  @media screen and (min-width: 768px) {
    margin-left: ${p => p.theme.space[5]}px;
    top: 45px;
    left: 0px;
  }
`;

export const ShowIcon = styled(FaEye)`
  color: ${p => p.theme.colors.regModalActiveBtn};
  size: 2em;
`;

export const HideIcon = styled(FaEyeSlash)``;

export const InputPasswordWraper = styled.div`
  position: relative;
`;

export const IconWraper = styled.div`
  position: absolute;
  right: 20px;
  top: 11px;

  @media screen and (min-width: 768px) {
    top: 14px;
  }
`;

export const EmailWraper = styled.div`
  position: relative;
  margin-bottom: 16px;
`;
