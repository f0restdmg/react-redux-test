import React from 'react';
import ArticleList from '../components/articles/ArticleList';
import MainWrapper from '../containers/MainWrapper';

const Articles = () => {
  return (
    <>
      <MainWrapper>
        <ArticleList />
      </MainWrapper> 
    </>
  );
}

export default Articles;