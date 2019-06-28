
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
};



export type AuthenticatedToken = {
  token?: Maybe<Scalars['String']>,
};

export type Card = {
  id: Scalars['ID'],
  image?: Maybe<Scalars['String']>,
  title?: Maybe<Scalars['String']>,
  blobInfo?: Maybe<Scalars['String']>,
  buttinText?: Maybe<Scalars['String']>,
  buttonClass?: Maybe<Scalars['String']>,
  fontStyle?: Maybe<Scalars['String']>,
  irRouterLink?: Maybe<Scalars['Boolean']>,
  component: Component,
};

export type Component = {
  id: Scalars['ID'],
  cardIs?: Maybe<Scalars['Boolean']>,
  cards?: Maybe<Array<Card>>,
  heroIs?: Maybe<Scalars['Boolean']>,
  heroSlides?: Maybe<Array<HeroSlide>>,
  textCenterIs?: Maybe<Scalars['Boolean']>,
  textCenterSection?: Maybe<TextCenter>,
  textLeftIs?: Maybe<Scalars['Boolean']>,
  textLeftSection?: Maybe<TextLeft>,
  textRightIs?: Maybe<Scalars['Boolean']>,
  textRightSection?: Maybe<TextRight>,
  page?: Maybe<Page>,
  componentOrderNum: Scalars['Int'],
};

export type HeroSlide = {
  id: Scalars['ID'],
  image?: Maybe<Scalars['String']>,
  title?: Maybe<Scalars['String']>,
  subTitle?: Maybe<Scalars['String']>,
  buttonText?: Maybe<Scalars['String']>,
  buttonClass?: Maybe<Scalars['String']>,
  buttonLink?: Maybe<Scalars['String']>,
  component: Component,
};

export type Mutation = {
  loginUser?: Maybe<AuthenticatedToken>,
  updateUser?: Maybe<User>,
  createUser?: Maybe<User>,
  createDraft?: Maybe<Page>,
  publish?: Maybe<Page>,
  deleteComponent?: Maybe<Component>,
  orderComponentsOnPage?: Maybe<Component>,
  createComponent?: Maybe<Component>,
  createTextLeft?: Maybe<TextLeft>,
  updateTextLeft?: Maybe<TextLeft>,
  deleteTextLeft?: Maybe<TextLeft>,
  createTextRight?: Maybe<TextRight>,
  updateTextRight?: Maybe<TextLeft>,
  deleteTextRight?: Maybe<TextRight>,
  createTextCenter?: Maybe<TextCenter>,
  updateTextCenter?: Maybe<TextCenter>,
  deleteTextCenter?: Maybe<TextCenter>,
  createHeroSlide?: Maybe<HeroSlide>,
  updateHeroSlide?: Maybe<HeroSlide>,
  deleteHeroSlide?: Maybe<HeroSlide>,
  createCard?: Maybe<Card>,
  deleteCard?: Maybe<Card>,
};


export type MutationLoginUserArgs = {
  email: Scalars['String'],
  hashed: Scalars['String']
};


export type MutationUpdateUserArgs = {
  userId: Scalars['ID'],
  email?: Maybe<Scalars['String']>,
  hashed?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>
};


export type MutationCreateUserArgs = {
  name: Scalars['String']
};


export type MutationCreateDraftArgs = {
  title: Scalars['String'],
  userId: Scalars['ID']
};


export type MutationPublishArgs = {
  pageId: Scalars['ID']
};


export type MutationDeleteComponentArgs = {
  componentId: Scalars['ID']
};


export type MutationOrderComponentsOnPageArgs = {
  pageId: Scalars['ID'],
  orderNumber?: Maybe<Scalars['Int']>,
  componentId: Scalars['ID']
};


export type MutationCreateComponentArgs = {
  pageId: Scalars['ID'],
  heroIs?: Maybe<Scalars['Boolean']>,
  cardIs?: Maybe<Scalars['Boolean']>,
  textCenterIs?: Maybe<Scalars['Boolean']>,
  textLeftIs?: Maybe<Scalars['Boolean']>,
  textRightIs?: Maybe<Scalars['Boolean']>,
  componentOrderNum: Scalars['Int']
};


export type MutationCreateTextLeftArgs = {
  componentId: Scalars['ID'],
  image?: Maybe<Scalars['String']>,
  content?: Maybe<Scalars['String']>,
  title?: Maybe<Scalars['String']>
};


export type MutationUpdateTextLeftArgs = {
  id: Scalars['ID'],
  image?: Maybe<Scalars['String']>,
  content?: Maybe<Scalars['String']>,
  title?: Maybe<Scalars['String']>
};


export type MutationDeleteTextLeftArgs = {
  id: Scalars['ID'],
  componentId: Scalars['ID']
};


export type MutationCreateTextRightArgs = {
  componentId: Scalars['ID'],
  image?: Maybe<Scalars['String']>,
  content?: Maybe<Scalars['String']>,
  title?: Maybe<Scalars['String']>
};


export type MutationUpdateTextRightArgs = {
  id: Scalars['ID'],
  image?: Maybe<Scalars['String']>,
  content?: Maybe<Scalars['String']>,
  title?: Maybe<Scalars['String']>
};


export type MutationDeleteTextRightArgs = {
  id: Scalars['ID'],
  componentId: Scalars['ID']
};


export type MutationCreateTextCenterArgs = {
  componentId: Scalars['ID'],
  image?: Maybe<Scalars['String']>,
  content?: Maybe<Scalars['String']>,
  title?: Maybe<Scalars['String']>
};


export type MutationUpdateTextCenterArgs = {
  id: Scalars['ID'],
  image?: Maybe<Scalars['String']>,
  content?: Maybe<Scalars['String']>,
  title?: Maybe<Scalars['String']>
};


export type MutationDeleteTextCenterArgs = {
  id: Scalars['ID'],
  componentId: Scalars['ID']
};


export type MutationCreateHeroSlideArgs = {
  componentId: Scalars['ID'],
  image?: Maybe<Scalars['String']>,
  title?: Maybe<Scalars['String']>,
  subTitle?: Maybe<Scalars['String']>,
  buttonText?: Maybe<Scalars['String']>,
  buttonClass?: Maybe<Scalars['String']>,
  buttonLink?: Maybe<Scalars['String']>
};


export type MutationUpdateHeroSlideArgs = {
  id: Scalars['ID']
};


export type MutationDeleteHeroSlideArgs = {
  id: Scalars['ID'],
  componentId: Scalars['ID']
};


export type MutationCreateCardArgs = {
  id: Scalars['ID'],
  image?: Maybe<Scalars['String']>,
  title?: Maybe<Scalars['String']>,
  blobInfo?: Maybe<Scalars['String']>,
  buttonText?: Maybe<Scalars['String']>,
  buttonLink?: Maybe<Scalars['String']>,
  isRouterLink?: Maybe<Scalars['Boolean']>
};


export type MutationDeleteCardArgs = {
  id: Scalars['ID'],
  componentId: Scalars['ID']
};

export type Page = {
  id: Scalars['ID'],
  title: Scalars['String'],
  published: Scalars['Boolean'],
  user?: Maybe<User>,
  components?: Maybe<Array<Maybe<Component>>>,
};

export type Query = {
  allUsers?: Maybe<Array<Maybe<User>>>,
  publishedPages: Array<Page>,
  page?: Maybe<Page>,
  isAuthenticated?: Maybe<AuthenticatedToken>,
  components?: Maybe<Array<Maybe<Component>>>,
  componentsOnPage?: Maybe<Array<Maybe<Component>>>,
  pagesByUser: Array<Page>,
};


export type QueryPageArgs = {
  pageId: Scalars['ID']
};


export type QueryComponentsOnPageArgs = {
  pageId: Scalars['ID'],
  orderBy?: Maybe<SortableField>
};


export type QueryPagesByUserArgs = {
  userId: Scalars['ID']
};

export enum SortableField {
  ComponentOrderNumAsc = 'componentOrderNum_ASC',
  ComponentOrderNumDesc = 'componentOrderNum_DESC'
}

export type Subscritpion = {
  createDraft?: Maybe<Page>,
  publish?: Maybe<Page>,
  deleteComponent?: Maybe<Component>,
  orderComponentsOnPage?: Maybe<Component>,
  createComponent?: Maybe<Component>,
  createTextLeft?: Maybe<TextLeft>,
  updateTextLeft?: Maybe<TextLeft>,
  deleteTextLeft?: Maybe<TextLeft>,
  createTextRight?: Maybe<TextRight>,
  updateTextRight?: Maybe<TextLeft>,
  deleteTextRight?: Maybe<TextRight>,
  createTextCenter?: Maybe<TextCenter>,
  updateTextCenter?: Maybe<TextCenter>,
  deleteTextCenter?: Maybe<TextCenter>,
  createHeroSlide?: Maybe<HeroSlide>,
  updateHeroSlide?: Maybe<HeroSlide>,
  deleteHeroSlide?: Maybe<HeroSlide>,
  createCard?: Maybe<Card>,
  deleteCard?: Maybe<Card>,
};


export type SubscritpionCreateDraftArgs = {
  title: Scalars['String'],
  userId: Scalars['ID']
};


export type SubscritpionPublishArgs = {
  pageId: Scalars['ID']
};


export type SubscritpionDeleteComponentArgs = {
  componentId: Scalars['ID']
};


export type SubscritpionOrderComponentsOnPageArgs = {
  pageId: Scalars['ID'],
  orderNumber?: Maybe<Scalars['Int']>,
  componentId: Scalars['ID']
};


export type SubscritpionCreateComponentArgs = {
  pageId: Scalars['ID'],
  heroIs?: Maybe<Scalars['Boolean']>,
  cardIs?: Maybe<Scalars['Boolean']>,
  textCenterIs?: Maybe<Scalars['Boolean']>,
  textLeftIs?: Maybe<Scalars['Boolean']>,
  textRightIs?: Maybe<Scalars['Boolean']>,
  componentOrderNum: Scalars['Int']
};


export type SubscritpionCreateTextLeftArgs = {
  componentId: Scalars['ID'],
  image?: Maybe<Scalars['String']>,
  content?: Maybe<Scalars['String']>,
  title?: Maybe<Scalars['String']>
};


export type SubscritpionUpdateTextLeftArgs = {
  id: Scalars['ID'],
  image?: Maybe<Scalars['String']>,
  content?: Maybe<Scalars['String']>,
  title?: Maybe<Scalars['String']>
};


export type SubscritpionDeleteTextLeftArgs = {
  id: Scalars['ID'],
  componentId: Scalars['ID']
};


export type SubscritpionCreateTextRightArgs = {
  componentId: Scalars['ID'],
  image?: Maybe<Scalars['String']>,
  content?: Maybe<Scalars['String']>,
  title?: Maybe<Scalars['String']>
};


export type SubscritpionUpdateTextRightArgs = {
  id: Scalars['ID'],
  image?: Maybe<Scalars['String']>,
  content?: Maybe<Scalars['String']>,
  title?: Maybe<Scalars['String']>
};


export type SubscritpionDeleteTextRightArgs = {
  id: Scalars['ID'],
  componentId: Scalars['ID']
};


export type SubscritpionCreateTextCenterArgs = {
  componentId: Scalars['ID'],
  image?: Maybe<Scalars['String']>,
  content?: Maybe<Scalars['String']>,
  title?: Maybe<Scalars['String']>
};


export type SubscritpionUpdateTextCenterArgs = {
  id: Scalars['ID'],
  image?: Maybe<Scalars['String']>,
  content?: Maybe<Scalars['String']>,
  title?: Maybe<Scalars['String']>
};


export type SubscritpionDeleteTextCenterArgs = {
  id: Scalars['ID'],
  componentId: Scalars['ID']
};


export type SubscritpionCreateHeroSlideArgs = {
  componentId: Scalars['ID'],
  image?: Maybe<Scalars['String']>,
  title?: Maybe<Scalars['String']>,
  subTitle?: Maybe<Scalars['String']>,
  buttonText?: Maybe<Scalars['String']>,
  buttonClass?: Maybe<Scalars['String']>,
  buttonLink?: Maybe<Scalars['String']>
};


export type SubscritpionUpdateHeroSlideArgs = {
  id: Scalars['ID']
};


export type SubscritpionDeleteHeroSlideArgs = {
  id: Scalars['ID'],
  componentId: Scalars['ID']
};


export type SubscritpionCreateCardArgs = {
  id: Scalars['ID'],
  image?: Maybe<Scalars['String']>,
  title?: Maybe<Scalars['String']>,
  blobInfo?: Maybe<Scalars['String']>,
  buttonText?: Maybe<Scalars['String']>,
  buttonLink?: Maybe<Scalars['String']>,
  isRouterLink?: Maybe<Scalars['Boolean']>
};


export type SubscritpionDeleteCardArgs = {
  id: Scalars['ID'],
  componentId: Scalars['ID']
};

export type TextCenter = {
  id: Scalars['ID'],
  image?: Maybe<Scalars['String']>,
  title?: Maybe<Scalars['String']>,
  content?: Maybe<Scalars['String']>,
  component: Component,
};

export type TextLeft = {
  id: Scalars['ID'],
  image?: Maybe<Scalars['String']>,
  title?: Maybe<Scalars['String']>,
  content?: Maybe<Scalars['String']>,
  component: Component,
};

export type TextRight = {
  id: Scalars['ID'],
  image?: Maybe<Scalars['String']>,
  title?: Maybe<Scalars['String']>,
  content?: Maybe<Scalars['String']>,
  component: Component,
};

export type User = {
  id: Scalars['ID'],
  email?: Maybe<Scalars['String']>,
  name: Scalars['String'],
  pages: Array<Page>,
  hashed?: Maybe<Scalars['String']>,
};
export type ComponentsOnThePageQueryVariables = {
  pageId: Scalars['ID']
};


export type ComponentsOnThePageQuery = ({ __typename?: 'Query' } & { componentsOnPage: Maybe<Array<Maybe<({ __typename?: 'Component' } & Pick<Component, 'componentOrderNum' | 'id' | 'textCenterIs' | 'textRightIs' | 'textLeftIs' | 'heroIs'> & { textCenterSection: Maybe<({ __typename?: 'TextCenter' } & Pick<TextCenter, 'title' | 'image' | 'content'>)>, textRightSection: Maybe<({ __typename?: 'TextRight' } & Pick<TextRight, 'title' | 'image' | 'content'>)>, textLeftSection: Maybe<({ __typename?: 'TextLeft' } & Pick<TextLeft, 'image' | 'id' | 'title' | 'content'>)>, heroSlides: Maybe<Array<({ __typename?: 'HeroSlide' } & Pick<HeroSlide, 'id' | 'title' | 'subTitle' | 'buttonText' | 'buttonClass' | 'buttonLink'> & { img: HeroSlide['image'] })>> })>>> });

import gql from 'graphql-tag';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';

export const ComponentsOnThePageDocument = gql`
    query ComponentsOnThePage($pageId: ID!) {
  componentsOnPage(pageId: $pageId, orderBy: componentOrderNum_ASC) {
    componentOrderNum
    id
    textCenterIs
    textCenterSection {
      title
      image
      content
    }
    textRightIs
    textRightSection {
      title
      image
      content
    }
    textLeftIs
    textLeftSection {
      image
      id
      title
      content
    }
    heroIs
    heroSlides {
      id
      img: image
      title
      subTitle
      buttonText
      buttonClass
      buttonLink
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class ComponentsOnThePageGQL extends Apollo.Query<ComponentsOnThePageQuery, ComponentsOnThePageQueryVariables> {
    document = ComponentsOnThePageDocument;
    
  }