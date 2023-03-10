import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import { selectIsLoggedIn } from 'redux/auth/selectors';
import { Box } from 'components/Box/Box';

import { ReactComponent as PlusIcon } from '../../assets/icons/plusIcon.svg';
import { AddModalNotice } from 'components/AddModalNotice/AddModalNotice';
import { showWarningNotification } from 'utils';

import {
  CategoriesWrap,
  CategoriesList,
  CategoriesItem,
  CategoryLink,
  AddPetBtn,
  AddPetBtnIconWrap,
} from './NoticesCategories.styled';

export const NoticesCategories = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const navigate = useNavigate();
  const { token } = useSelector(state => state.auth);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleModalToggle = () => {
    setIsModalOpen(prev => {
      return !prev;
    });
  };

  const handleAddPetButtonClick = e => {
    if (!isLoggedIn) {
      return showWarningNotification(
        'Only authorized users can add new notice',
        2500
      );
    }
    handleModalToggle();
  };

  return (
    <Box display="flex" justifyContent="center">
      <CategoriesWrap>
        <CategoriesList>
          <CategoriesItem>
            <CategoryLink to="lost-found">lost/found</CategoryLink>
          </CategoriesItem>

          <CategoriesItem>
            <CategoryLink to="for-free">in good hands</CategoryLink>
          </CategoriesItem>

          <CategoriesItem>
            <CategoryLink to="sell">sell</CategoryLink>
          </CategoriesItem>

          {isLoggedIn && (
            <>
              <CategoriesItem>
                <CategoryLink to="favorite">favorite ads</CategoryLink>
              </CategoriesItem>

              <CategoriesItem>
                <CategoryLink to="own">my ads</CategoryLink>
              </CategoriesItem>
            </>
          )}
        </CategoriesList>
        <AddPetBtn type="button" onClick={handleAddPetButtonClick}>
          Add pet
          <AddPetBtnIconWrap>
            <PlusIcon />
          </AddPetBtnIconWrap>
        </AddPetBtn>
        {isModalOpen && (
          <AddModalNotice handleModalToggle={handleModalToggle} />
        )}
      </CategoriesWrap>
    </Box>
  );
};
