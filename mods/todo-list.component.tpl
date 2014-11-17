<ul id="todo-list">
    {{#list}}
        {{#if filter(.) }}
        <todo-item id="{{ id }}" label="{{ label || '' }}" done="{{ done || false }}" />
        {{/if}}
    {{/list}}
</ul>