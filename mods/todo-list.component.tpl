<ul id="todo-list">
    {{#list}}
        {{#if filter(.) }}
    <li class="todo-list__item">
        <todo-item id="{{ id }}" label="{{ label || '' }}" done="{{ done || false }}" />
    </li>
        {{/if}}
    {{/list}}
</ul>