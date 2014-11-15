<ul id="filters">
    {{#filters:i}}
    <li>
        <input
            class="todo-filters__filter todo-filters__filter--{{ . }}"
            name="todo-filters__filter"
            id="todo-filters__filter--{{ . }}"
            type="radio"
            value="{{ . }}"
            checked="{{ i === 0 }}"
            on-change="choose(.)"
        />
        <label
            for="todo-filters__filter--{{ . }}"
        >{{ labels[.] }}</label>
    </li>
    {{/filters}}
</form>