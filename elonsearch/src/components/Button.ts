// @ts-ignore
import styled from 'styled-components';
import { Button } from 'antd';

export const BorderedButton = styled(Button)`
  && {
    border-radius: 60px;
    background: none;
    color: #fff;
    border: 1.5px solid #fff;
    cursor: pointer;
    font-size: 16px;
    text-align: center;
    font-family: Poppins, sans-serif;
    font-weight: 100;
    width: ${(props: { width: string }) => (props.width ? props.width : '30%')};
    height: 50px;
    margin-top: ${(props: { top: string }) => props.top ? props.top : "0"};
    margin-left: ${(props: { left: string }) => props.left ? props.left : "0"};
    margin-right: ${(props: { right: string }) => props.right ? props.right : "0"};
    margin-bottom: ${(props: { bottom: string }) => props.bottom ? props.bottom : "0"};

    transition: all 0.2s ease-in-out;
    text-decoration: none;

    &:focus {
      color: #46c7c7;
      background: none;
      border: 2px solid #46c7c7;
    }

    &:hover {
      transform: scale(1.02);
      transition: all 0.1s ease-in-out;
      color: #46c7c7;
      background: none;
      border: 2px solid #46c7c7;
    }
  }
`;