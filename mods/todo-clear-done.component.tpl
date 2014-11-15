{{#if doneNumber > 0 }}
<button
    id="clear-completed"
    on-click="clearDone()"
>Clear completed ({{ doneNumber }})</button>
{{/if}}