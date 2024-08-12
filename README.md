# Margin Design System

> [!IMPORTANT]
> This is a experimental library

> [!CAUTION]
> Experiment has ended as of 2024-08-11 - see conclusion below. You can also checkout the last build of the storybook [here](https://tounsoo.github.io/margin-ds/?path=/docs/component-button--docs).


## Concept
This library is experimental library to test the concept of using [margin collapsing](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_box_model/Mastering_margin_collapsing) as a way to create safety area that meets AA or AAA level touch target guideline. 

Other things being tested:
- [React 19 (rc)](https://react.dev/blog/2024/04/25/react-19-upgrade-guide)
- CSS anchor in React 19 (rc)
- [Popover API](https://github.com/facebook/react/issues/27479) in React 19 (rc)
- DatePicker using Temporal ([temporal-polyfill](https://github.com/fullcalendar/temporal-polyfill))


## Conclusion

### Margin collapse for safety area
This was a tricky one. Concept itself would work but it was not able to fully automate. For example, if the Button sits on the far left of the Page, it will need to ignore the margin-inline-start to align prefectly with top and bottom contents. 

Also, when used with flexbox and gaps, it did not collapse those.

### React19
Not much of the feature of react19 was used in this library. Mainly benefited from being able to use CSS anchor and Popover API, and also [NOT having to deal with forwardRef](https://react.dev/blog/2024/04/25/react-19#ref-as-a-prop)!!!

### Temporal
[Temporal-polyfill](https://github.com/fullcalendar/temporal-polyfill) is a work in progress polyfill that isn't fully up-to-date with the [temporal proposal](https://github.com/tc39/proposal-temporal). But it really did make the build of the DatePicker so much easier. One of the mian benefit was being able to use PlainDate without time which reduced so much of the complexity DatePicker does not need to handle.

