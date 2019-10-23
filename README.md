# 1650 - Youth Custodial IRA Portal

## Full Stack website to inform about Custodial IRAs 

## Description

This full stack web site is an information portal aimed at high school students and their parents.  It provides a high level introduction to compound interest, retirement investing, open a Custodial IRA for a minor and an easy and fun modeling calcuator that graphs hypothetical retirement results using a spreadsheet like grid for data input.

The has topic slides for induction to compound interest, how to use the model calculator, student finance, parent involvement and custodial IRAs.  There are links to external sites on the topic slides. 

The modeling calculator can be used without a login as guest.  Authentication signup and login allows for saving and loading of the models thru data persistance.  The UX is polished and features some extras such as wallpaper image choices with local storage being used to persist the choice when later returning to the sites.

The backend use mySQL, Sequelize and API routes for HTML and database operations.  Professional grade library HighCharts.js is used for the modeling calcuator chart and the introduction slide presentation.

- #### Front-End Technology

  - HTML, CSS, JavaScript (ES6 & some OOP), jQuery, Bootstrap, HighCharts.js

  #### Back-End Technology

  - Node.js, Express.js, mySQL, JavaScript (ES6 & some OOP), NPM packages (express, mysql, path, sequelize, passport), API routes, Heroku

## Details:

- #### Github project:  <a href="https://github.com/mylescarey2019/1650">1650 Teen Custodial IRA Planner</a>

- #### Deployed Heroku link:  <a href="https://nameless-sea-48228.herokuapp.com/#">1650 Teen Custodial IRA Planner</a>

- #### For further design and development details see: 

  - #### [Project Proposal with User Stories](Proposal.md)

  - #### [Project Plan](ProjectPlan.md)

  - #### [Detail Design Elements](DetailDesign.md)

  - #### [Database Schema and SQL Queries](Database-Schema.md)

- #### Demo walkthru GIF : 

  - Use Cases seen in demo below

    - [x] Introduction slide animation
    - [x] Informational slides
    - [x] modeling calculator with graph used as site guest
    - [x] authentication
    - [x] saved and loaded models

    

  ![demo-gif](./public/assets/img/demo-gif.gif)

  

#### Screen Captures:

Page upper section - introduction slide

![intro-slide](./public/assets/img/readMEs/intro-slide.png)



Modeling Tool

![model-tool](./public/assets/img/readMEs/model-tool.png)



Modal examples:

![login-modal](./public/assets/img/readMEs/login-modal.png)



![model-modal](./public/assets/img/readMEs/model-modal.png)

## Getting Started

### Native and NPM Packages Used

1. express  & express-session - for server and authentication support
2. passport & passport-local - for authentication
3. bcrypt & bcryptjs - for password hashing
4. mysql - for database connectivity
5. sequelize - for ORM database support
6. path - for absolute and relative path resolution

### Dependencies

- none - Note:  not fully responsive yet - best viewed at or above 1440x900 or larger

### Installing

- none necessary - use link to page deployed on Heroku

### Executing program

- navigate thru slides via nav bar links or carousel 
- scroll down to access the modeling tool
- use modeling tool as guest - click into cells to changes values then refresh model to see graph updated
- signup and login to create models, save models and load saved models - see Your Models link in navbar
- for fun select from several wallpapers via nav bar dropdown

#### Planned & Possible Enhancements

- [ ] clean up responsiveness 
- [ ] replace/improve spreadsheet grid - allow adding and removing of rows
- [ ] try dynamic chart rendering on grid value change eliminating need for Refresh Model button
- [ ] database cleanup to remove guest models no longer being used
- [ ] complete calculator features:  allow monthly and yearly investment frequency, implement inflation correction
- [ ] improved Get Started slide by making the model how-to image have hotspots with popup modals for further explainations
- [ ] user preferences modal - move wallpaper setting into it; add settings for preset Modeled Return and Inflation rates
- [ ] improve slide content 
- [ ] password recovery
- [ ] layout rework - consider moving from slide layout to traditional page sections accessed via scroll and links
- [ ] provide dynamic page footer attributions wallpaper images thanking given unsplash photographer

## Authors

Myles Carey 
mylescarey2019@gmail.com 

## Version History

- 1.0 - Initial Release  10/18/2019
- 1.0.1 - Mini-Sprint 1 release 10/23/2019
  - Two level NavBar with logged in User acknowlegement
  - masked password
  - hidden, but clickable diagnostic user & model information in left side of footer
  - Brand Logo now returns viewport to the first carousel slide
- Full Sprint 1 scheduled for 10/27/2019 release - improve responsiveness down to form factor 1024x768 (iPad)



## License

## Acknowledgments

Thanks to beta testers - my 15yo & 17yo daughters and wife 

Thanks to unsplash photographers for slide and wallpaper images - individual attributes to be added to site footer in upcoming release

