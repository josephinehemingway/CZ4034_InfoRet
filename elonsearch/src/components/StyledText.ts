// @ts-ignore
import styled from 'styled-components'
import { Select } from 'antd'

export const StyledTitle = styled.div`
    && {
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: SpaceX, serif;
      color: ${(props: { color: string }) => (props.color ? props.color : '#fff')};
      font-size: ${(props: { fontsize: string }) => (props.fontsize ? props.fontsize : '50px')};;
      font-weight: normal;
      text-align: center;
      margin-bottom: ${(props: { bottom: string }) => (props.bottom ? props.bottom : '1rem')};;
      margin-top: ${(props: { top: string }) => (props.top ? props.top : '0')};;
      width: 100%;
    }
`

export const StyledLink = styled.a`
  && {
    margin-top: ${(props: { top: string }) => (props.top ? props.top : '0.25rem')};
    margin-bottom: ${(props: { bottom: string }) => (props.bottom ? props.bottom : '0')};
    margin-left: ${(props: { left: string }) => props.left ? props.left : "0"};
    margin-right: ${(props: { right: string }) => props.right ? props.right : "0"};
    font-family: Inter-Regular, serif;
    color: ${(props: { color: string }) => (props.color ? props.color : '#ffffff80')};
    font-size: ${(props: { fontsize: string }) => (props.fontsize ? props.fontsize : '16px')};;
    text-align: center;

    &:hover {
      color: ${(props: { hovercolor: string }) => (props.hovercolor ? props.hovercolor : '#fff')};
      text-decoration: underline;
    }
  }
`

export const StyledText = styled.p`
    && {
      font-family: Inter-Regular, serif;
      color: ${(props: { color: string }) => (props.color ? props.color : '#fff')};
      font-size: ${(props: { fontsize: string }) => (props.fontsize ? props.fontsize : '16px')};
      text-align: ${(props: { align: string }) => (props.align ? props.align : 'center')};
      margin-bottom: ${(props: { bottom: string }) => props.bottom ? props.bottom : "0"};
      margin-top: ${(props: { top: string }) => props.top ? props.top : "0"};
      margin-left: ${(props: { left: string }) => props.left ? props.left : "0"};
      margin-right: ${(props: { right: string }) => props.right ? props.right : "0"};
    }
`

export const StyledHeading = styled.h3`
    && {
      width: 100%;
      font-family: Inter-Bold, serif;
      color: ${(props: { color: string }) => (props.color ? props.color : '#fff')};
      font-size: ${(props: { fontsize: string }) => (props.fontsize ? props.fontsize : '20px')};
      text-align: ${(props: { align: string }) => (props.align ? props.align : 'center')};
      margin-bottom: ${(props: { bottom: string }) => props.bottom ? props.bottom : "1rem"};
      margin-top: ${(props: { top: string }) => props.top ? props.top : "0"};
      margin-left: ${(props: { left: string }) => props.left ? props.left : "0"};
      margin-right: ${(props: { right: string }) => props.right ? props.right : "0"};
    }
`

export const StyledLabel = styled.p`
    && {
      font-family: Inter-Regular, serif;
      color: ${(props: { color: string }) => (props.color ? props.color : 'rgba(255,255,255,0.7)')};
      //font-weight: 600;
      font-size: ${(props: { fontsize: string }) => (props.fontsize ? props.fontsize : '16px')};
      text-align: ${(props: { align: string }) => (props.align ? props.align : 'start')};
      align-items: center;
      margin-bottom: ${(props: { bottom: string }) => props.bottom ? props.bottom : "0"};
      margin-top: ${(props: { top: string }) => props.top ? props.top : "0"};
      margin-left: ${(props: { left: string }) => props.left ? props.left : "0"};
      margin-right: ${(props: { right: string }) => props.right ? props.right : "0"};
    }
`

export const StyledSelect = styled(Select)`
  && {
    width: ${(props: { width: string; }) => (props.width ? props.width : '100%')};
    margin-bottom: ${(props: { marginbottom: string; }) => (props.marginbottom ? props.marginbottom : '0.25rem')};
    margin-right: ${(props: { right: string; }) => props.right ? props.right : '0'} 
    
    font-family: 'Inter-Regular', serif;
    font-size: 16px;
    background: none;
    color: #fff;
    
    & .ant-select-selection-placeholder {
      color: #ffffff80;
      font-size: 16px;
    }
    
    & .ant-select-selector {
      background: none;
      padding-right: 0;
    }
    
    & .ant-select-arrow {
      color: #fff;
    }
    
    & .ant-select-selection-item {
      color: #ffffff80;
      font-size: 16px;
    }

    & .ant-select-clear {{
      border-radius: 10px
    }
  }
`