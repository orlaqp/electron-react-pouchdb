import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '@wawa-kiosk/ui/home/data-access';
import Button from '@material-ui/core/Button';


import './ui-home-feature.module.scss';
import { Dictionary } from '@reduxjs/toolkit';
import { Product } from '@wawa-kiosk/ui/data-storage';

/* eslint-disable-next-line */
export interface HomeProps {}

export function Home(props: HomeProps) {
  const dispatch = useDispatch();
  const products: Dictionary<Product> = useSelector((state: any) => state.products.entities);

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch]);

  return (
    <div>
      <h1>Welcome to ui-home-feature!</h1>
      {
        Object.entries(products).map(([key, value]) => (<p key={value?.name}>{value?.name}</p>))
      }  
    
      <Button variant="contained">Refresh</Button>      
    </div>
  );
}

export default Home;
