# Diagon-e-lley

**http://diagon-e-lley.herokuapp.com/**

_A one stop shop for your next year essentials at Hogwarts School of Witchcraft and Wizardry_

![diagonGif](https://user-images.githubusercontent.com/37169691/83446756-3fd2ae00-a41d-11ea-8b0c-1009759f1151.gif)

Diagon e-lley is a fullstack mock e-commerce site, built around the theme of a Hogwarts campus supply store. This project was built over ten days by [Mohana Bansal](https://github.com/mohanabansal), [Arianna Campesi](https://github.com/ariannacampesi), [Jennifer Li](https://github.com/jli09), and [Nora Lashner](https://github.com/nlashner).

The front end user interface was created with `React` and `Redux`, and also relies on `localStorage`. The backend uses REST API routes set up in `Express`, with data stored in a `PostgreSQL` database via `Sequelize` ORM.

The website supports three different types of user experiences: guest, logged in user, and administrator.

All users can:

* browse all products
* filter products by specific categories
* add products to the cart
* edit contents of the cart
* "checkout" and "buy" products
* have the cart automatically save across page refreshes

Logged-in users can also:

* update their profile
* have cart automatically sync among multiple clients
* have cart be saved after logout
* receive a purchase confirmation email
* view previous purchase history

Administrators have these additional capabilities:

* add, update, and delete inventory
* view all signed up users

Please checkout our site with the link at the top!
