# Diagon-e-lley

_A one stop shop for your next year essentials at Hogwards- School of Witchcraft and Wizardry_

Diagon-e-lley is an online shopping website for the students of Hogwards. A user can either be a member of the shopping portal, a guest user or an admin. All the users can:

* to browse all products
* to view products by categories by choosing the category from navbar
* to add products or view exisitng products in cart
* update the quanity of products needed in cart
* checkout and buy products

If the user is admin, he has the following capabilities:

* can update inventory from front-end
* can view all the signed up members

If the user is a member, besides the common abilities he can also:

* update his profile
* view purchase history

This is a fullstack e-commerce website. The front end is built with `ReactJS`, `Redux`, `HTML`, `CSS` and the backend is built using `NodeJS`, `Express`.

Checkout our website [here][diagon-e-lley]

[diagon-e-lley]: http://diagon-e-lley.herokuapp.com/

_Good things come in pairs_

Looking to mix up a backend with `express`/`sequelize` and a frontend with
`react`/`redux`? That's `boilermaker`!

Follow along with the boilerplate workshop to make your own! This canonical
version can serve as a reference, or a starting point. For an in depth
discussion into the code that makes up this repository, see the
[Boilermaker Guided Tour][boilermaker-yt]

[boilermaker-yt]: https://www.youtube.com/playlist?list=PLx0iOsdUOUmn7D5XL4mRUftn8hvAJGs8H

## Setup

To use this as boilerplate, you'll need to take the following steps:

* Don't fork or clone this repo! Instead, create a new, empty
  directory on your machine and `git init` (or create an empty repo on
  Github and clone it to your local machine)
* Run the following commands:

```
git remote add boilermaker https://github.com/FullstackAcademy/boilermaker.git
git fetch boilermaker
git merge boilermaker/master
```

Why did we do that? Because every once in a while, `boilermaker` may
be updated with additional features or bug fixes, and you can easily
get those changes from now on by entering:

```
git fetch boilermaker
git merge boilermaker/master
```

## Customize

Now that you've got the code, follow these steps to get acclimated:

* Update project name and description in `package.json` and
  `.travis.yml` files
* `npm install`
* Create two postgres databases (`MY_APP_NAME` should match the `name`
  parameter in `package.json`):

```
export MY_APP_NAME=boilermaker
createdb $MY_APP_NAME
createdb $MY_APP_NAME-test
```

* By default, running `npm test` will use `boilermaker-test`, while
  regular development uses `boilermaker`
* Create a file called `secrets.js` in the project root
  * This file is listed in `.gitignore`, and will _only_ be required
    in your _development_ environment
  * Its purpose is to attach the secret environment variables that you
    will use while developing
  * However, it's **very** important that you **not** push it to
    Github! Otherwise, _prying eyes_ will find your secret API keys!
  * It might look like this:

```
process.env.GOOGLE_CLIENT_ID = 'hush hush'
process.env.GOOGLE_CLIENT_SECRET = 'pretty secret'
process.env.GOOGLE_CALLBACK = '/auth/google/callback'
```

### OAuth

* To use OAuth with Google, complete the steps above with a real client
  ID and client secret supplied from Google
  * You can get them from the [Google APIs dashboard][google-apis].

[google-apis]: https://console.developers.google.com/apis/credentials

## Linting

Linters are fundamental to any project. They ensure that your code
has a consistent style, which is critical to writing readable code.

Boilermaker comes with a working linter (ESLint, with
`eslint-config-fullstack`) "out of the box." However, everyone has
their own style, so we recommend that you and your team work out yours
and stick to it. Any linter rule that you object to can be "turned
off" in `.eslintrc.json`. You may also choose an entirely different
config if you don't like ours:

* [Standard style guide](https://standardjs.com/)
* [Airbnb style guide](https://github.com/airbnb/javascript)
* [Google style guide](https://google.github.io/styleguide/jsguide.html)

## Start

Running `npm run start-dev` will make great things happen!

If you want to run the server and/or `webpack` separately, you can also
`npm run start-server` and `npm run build-client`.

From there, just follow your bliss.

## Deployment

Ready to go world wide? Here's a guide to deployment! There are two
supported ways to deploy in Boilermaker:

* automatically, via continuous deployment with Travis.
* "manually", from your local machine via the `deploy` script.

Either way, you'll need to set up your deployment server to start.
The steps below are also covered in the CI/CD workshop.
