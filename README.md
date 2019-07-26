# Prisma CMS Site Builder
This project is built to work with a prisma graphql server.
With it you can create keys and values that corespond to components on pages
built to be used with https://github.com/AndySouthwick/prisma-cms

the idea is you build out your local component library and then add them to the component-display component. Your components are usually dumb components
that consume data. inside of the cms at /type-creator you can add your model that represents
your components data. This adds the model to the page creator on /dashboard.  

We took the idea of creating content types from drupal. So your content types are what house the data or the content.

## install instructions

1. Clone the project
2. NPM Install
### On server project

3. [Click to clone server project] (https://github.com/AndySouthwick/prisma-cms)

run these commands

4. `npm install -g prisma`
5. `docker-compose up -d`
6. `prisma deploy`
7. `prisma generate`
8. `node index.js or nodemon index.js`

I'm taking some liberties believing that you have node installed.

After the project is running create a user on the gql query GUI

9. got to localhost:4000
10. run this mutation in the GUI ```mutation{ createUser(name: "<NAME OF USER>" email: "<EMAIL FOR USER>" hashed: "<PWD>){ id } }```

### on angular project
11. Copy the created user id and navigate to the page service in the Angular project and paste in as the id variable in the createNewPage 
```function
createNewPage (title): Observable<any> { return this.apollo.mutate({ mutation: this.createPage, variables: { title: title, ** id: 'cjygedbef001k0847vi3jd2yx'** } }).pipe(map(({data}) => data)); }
```

12. Navigate to the localhost:4200/dashboard or the port your Angular app is running on
13. Create a page


This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.0.3.

# To Do
- [ ] Localization
- [ ] Add blog area that functions like pages
- [ ] Add manage user area
- [ ] rules for permissions
- [ ] Publish date timer
- [ ] Workflow notification


## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).



