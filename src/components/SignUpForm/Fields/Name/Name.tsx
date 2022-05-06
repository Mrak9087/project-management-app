import React from 'react';
import { UseFormRegister } from 'react-hook-form';

import { SignUpFormDataType } from '../../../../types';

import cl from './Name.module.scss';

export type NameProps = {
  register: UseFormRegister<SignUpFormDataType>;
};

const Name = ({ register }: NameProps) => {
  return (
    <div className={cl.container}>
      <input
        {...register('name', {
          required: 'Поле имя не может быть пустым',
        })}
        placeholder="Введите имя"
        type="text"
      />
    </div>
  );
};

export default Name;
