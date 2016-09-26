#### Godmin [![Gem Version](http://img.shields.io/gem/v/godmin.svg)](https://rubygems.org/gems/godmin)

# Godmin Material

This is a fork of the Godmin admin framework with the purpose of implementing Material Design through the Angular Material framework in Godmin without disrupting the automatic view generation. Angular is only used to bootstrap and include Angular Material. We include the libraries via CDN now but this will hopefully be changed to use a package manager such as npm in the future.

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

---

## Components

### Dialog

If you require dialogs (modals) in your custom CRUD views you can write a Dialog Component:

```
  <div style="visibility: hidden">
    <div class="md-dialog-container" id="myDialogID">
      <md-dialog layout-padding>
        <md-dialog-content>
          <!-- Dialog body -->
        </md-dialog-content>
        <md-dialog-actions>
          <!-- hide() hides the currently open Dialog (same as clicking outside) -->
          <md-button ng-click="hide()">
            Close
          </md-button>
        </md-dialog-actions>
      </md-dialog>
    </div>
  </div>
```

To have a trigger for the dialog simply place a button wherever you want it with this markup:

```
  <md-button ng-click="showDialog($event, '#myDialogID')">
    Open Dialog
  </md-button>
```

---


#### for further help check [Godmins' documentation](https://github.com/varvet/godmin)