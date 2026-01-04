# Component Patterns
Keywords: glimmer, component, helper, tracked, args, template

## Glimmer Component Pattern

All components use Glimmer syntax with native classes:

```javascript
import Component from '@glimmer/component';
import { getOwner } from '@ember/application';
import { tracked } from '@glimmer/tracking';

export default class ExampleComponent extends Component {
  @tracked someValue;

  get computedProperty() {
    // Access args via this.args
    return this.args.publicId;
  }

  get configValue() {
    // Access environment config
    return getOwner(this).resolveRegistration('config:environment').cloudinary.cloudName;
  }
}
```

## Template Pattern

Templates use `...attributes` for splattributes and computed getters:

```handlebars
<img
  ...attributes
  src={{this.src}}
  width={{this.width}}
  height={{this.height}}
  alt="{{this.alt}}"
/>
```

## Helper Pattern

Template helpers extend `@ember/component/helper`:

```javascript
import Helper from '@ember/component/helper';

export default class MyHelper extends Helper {
  compute(params, hash) {
    // params = positional arguments
    // hash = named arguments
    return processedValue;
  }
}
```

## Security Pattern

All user-provided values are escaped before URL construction:

```javascript
import Ember from 'ember';

const escapedValue = Ember.Handlebars.Utils.escapeExpression(value);
```

## Conventions
- Component files: PascalCase class, kebab-case filename
- Args access: `this.args.propertyName`
- Tracked state: `@tracked` decorator
- Config access: `getOwner(this).resolveRegistration('config:environment')`

## Rules
- MUST: Escape user input with `Ember.Handlebars.Utils.escapeExpression`
- MUST: Use `htmlSafe()` only for constructed safe strings
- PREFER: Computed getters over tracked properties for derived state
- AVOID: Direct Ember imports except for escapeExpression (no module available yet)

## References
- Key files: addon/components/cloudinary-image.js, addon/helpers/safe-cloudinary-url.js
- Related contexts: cloudinary/api/context.md
