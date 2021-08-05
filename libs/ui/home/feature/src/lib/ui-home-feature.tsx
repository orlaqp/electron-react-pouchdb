import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '@wawa-kiosk/ui/home/data-access';

import './ui-home-feature.module.scss';

/* eslint-disable-next-line */
export interface HomeProps {}

export function Home(props: HomeProps) {
  const dispatch = useDispatch();
  const products = useSelector((state: unknown) => state.products.entities);

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch]);

  return (
    <div>
      <h1>Welcome to ui-home-feature!</h1>
      {
        Object.entries(products).map(([key, value]) => (<p key={value.name}>{value.name}</p>))
      }  
    </div>
  );
}

export default Home;
