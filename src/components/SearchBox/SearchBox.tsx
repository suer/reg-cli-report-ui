import React from 'react';
import styled from 'styled-components';
import { Space, Color, Duration, Easing } from '../../styles/variables';
import { SearchIcon } from '../icons/SearchIcon';

const Wrapper = styled.div`
  position: relative;
`;

const Icon = styled.span`
  position: absolute;
  top: 50%;
  left: ${Space * 2}px;
  display: block;
  transform: translateY(-50%);
  line-height: 0;
`;

const TextField = styled.input`
  position: relative;
  display: block;
  width: 100%;
  height: 60px;
  padding: ${Space * 1}px ${Space * 1}px ${Space * 1}px ${Space * 7}px;
  border: none;
  border-bottom: 1px solid ${Color.BORDER};
  background: transparent;
  font-size: inherit;
  font-family: inherit;
  transition: border ${Duration.SMALL_OUT}ms ${Easing.STANDARD};

  &:focus {
    outline: none;
    border-bottom-color: ${Color.PRIMARY};
  }
`;

export type Props = React.ComponentPropsWithoutRef<'input'> & {
  inputRef?: React.Ref<HTMLInputElement>;
};

export const SearchBox: React.FC<Props> = ({ inputRef, children, ...rest }) => {
  return (
    <Wrapper>
      <Icon aria-hidden="true">
        <SearchIcon fill={Color.GRAY} />
      </Icon>
      <TextField ref={inputRef} type="text" {...rest} />
    </Wrapper>
  );
};
