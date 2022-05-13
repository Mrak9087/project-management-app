import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { boardsSlice } from '../../store/reducers/BoardsSlice';
import CreateForm from './components/CreateForm';
import { getBoards } from '../../store/thunks';
import Item from './components/Item';
import ModalPortal from '../../Portals/ModalPortal';
import preloader from '../../assets/buttonPreloader.svg';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

import searchImg from '../../assets/search.svg';

import cl from './Boards.module.scss';
import { useSearchParams } from 'react-router-dom';
import { useDebounce } from '../../hooks/useDebounce';

const Boards = () => {
  const { boards, isModalOpen, searchValue, isPending, error } = useAppSelector(
    (state) => state.BoardsReducer
  );
  const { setIsModalOpen, setSearchValue } = boardsSlice.actions;
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  const debouncedSearchValue = useDebounce(searchQuery, 1000);
  const [filteredBoards, setFilteredBoards] = useState(boards);

  const createBoard = () => {
    dispatch(setIsModalOpen(true));
  };

  const closeModal = () => {
    dispatch(setIsModalOpen(false));
  };

  const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    dispatch(setSearchValue(value));
  };

  useEffect(() => {
    dispatch(getBoards());
  }, []);

  useEffect(() => {
    if (debouncedSearchValue) {
      setFilteredBoards(
        boards.filter((el) => el.title.toLocaleLowerCase().includes(debouncedSearchValue))
      );
    } else {
      setFilteredBoards(boards);
    }
  }, [debouncedSearchValue]);

  useEffect(() => {
    searchValue ? setSearchParams({ search: searchValue }) : setSearchParams({ search: '' });
  }, [searchValue]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <div className={cl.boards}>
      <div className={cl.heading}>
        <h2 className={cl.title}>Ваши рабочие пространства</h2>
        <div className={cl.search}>
          <label htmlFor="searchId">
            <img src={searchImg} alt="search-icon" />
          </label>
          <input type="text" id="searchId" value={searchValue} onChange={searchHandler} />
        </div>
      </div>
      <div className={cl.container}>
        {filteredBoards &&
          filteredBoards.map(({ title, id }) => <Item key={id} title={title} id={id} />)}
        <button className={cl.create} onClick={createBoard} disabled={isPending}>
          {isPending ? (
            <img className={cl.preloader} src={preloader} alt="preloader" />
          ) : (
            <span>Создать доску</span>
          )}
        </button>
      </div>
      <ModalPortal isActive={isModalOpen} close={closeModal}>
        <CreateForm />
      </ModalPortal>
      <ToastContainer
        position="bottom-right"
        theme="colored"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
      />
    </div>
  );
};

export default Boards;
