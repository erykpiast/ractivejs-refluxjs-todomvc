<header id="header">
    <h1>todos</h1>

    <todo-add-item />
</header>

<section id="main">
    {{#if list.length > 0 }}
    <todo-toggle-all />
    {{/if}}
    
    {{#if list.length > 0 }}
    <todo-list list="{{ list || null }}" filter="{{ filters.current || null }}" />
    {{/if}}
</section>

<footer id="footer">
    <todo-in-progress-counter inProgressNumber="{{ inProgressNumber || 0 }}" />
    <todo-filters filters="{{ filters.names || null }}" />
    <todo-clear-done doneNumber="{{ doneNumber || 0 }}" />
</footer>