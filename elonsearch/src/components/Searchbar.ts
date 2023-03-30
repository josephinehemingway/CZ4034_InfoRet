// @ts-ignore
import styled from "styled-components";
import { Input } from "antd";

export const StyledInputSearch = styled(Input)`
  && {
    color: #fff;
    //border: 1.2px solid #fff;
    border: none;

    .ant-input {
      background: none;
      color: #fff;
      margin-left: 0.5rem;
    }

    .anticon {
      color: #fff;
    }

    img {
      -webkit-filter: opacity(60%);
    }

    img:hover {
      transform: scale(1.01);
      -webkit-filter: opacity(100%);
    }

    background: rgba(255, 255, 255, 0.8);
    border-radius: 60px;
    width: ${(props: { width: string }) =>
            props.width ? props.width : "50%"};
    height: 50px;
    display: flex;
    flex-direction: row;
    padding: 0.25rem 1rem;
    margin-top: 1rem;
    margin-bottom: 1rem;
    font-family: Lato, sans-serif;
    font-size: 16px;

    &:hover {
      border: 2px solid rgba(121, 118, 232, 0.8);
    }
  }
`;
