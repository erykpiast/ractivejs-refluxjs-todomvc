<header id="header">
    <h1>todos</h1>

    <todo-add-item />
</header>

{{#if list.length > 0 }}
<section id="main">
    <todo-toggle-all />
    <todo-list list="{{ list || null }}" filter="{{ filters.current || null }}" />
</section>

<footer id="footer"> 
    <todo-in-progress-counter inProgressNumber="{{ inProgressNumber || 0 }}" />
    <todo-filters filters="{{ filters.names || null }}" />
    <todo-clear-done doneNumber="{{ doneNumber || 0 }}" />
</footer>
{{/if}}