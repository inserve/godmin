# Godmin Material

This is a fork of the Godmin admin framework with the purpose of implementing Material Design through the Angular Material framework. Angular is only used to bootstrap and include Angular Material. We include the libraries via CDN now but this will hopefully be changed to use a package manager such as npm in the future.

## Configuration

### SASS color overrides

All the SASS variables can be found in [app/assets/stylesheets/godmin/variables.scss](https://github.com/inserve/godmin-material/tree/master/app/assets/stylesheets/godmin/variables.scss)

and you can override them like so:

- Create or copy the Godmin-Material variables.scss in /yourapp/app/assets/stylesheets/

`in /yourapp/app/assets/stylesheets/application.scss`

```
  @import "variables";
  @import "godmin/index";
```

You can now override any of the given variables in your own local `variables.scss` and refresh the admin interface to see the reflected changes.

Notes:
- if your application.scss file is a .css simply rename it to .scss
- if you already have `*= require godmin` at the top in your application.scss remove it now, we include it via SASS to have control of the order it gets loaded


#### for further help check [Godmins' documentation](https://github.com/varvet/godmin)