<li class="{{ done ? 'completed' : '' }} {{ editing ? 'editing' : '' }}">
    <div class="view">
        <input
            class="toggle"
            type="checkbox"
            checked="{{ done }}"
            disabled="{{ editing }}"
            on-change="toggle()"
        />
        <label
            on-dblclick="startEditing()"
        >{{ label }}</label>
        <button
            class="destroy"
            on-click="remove()"
        ></button>
    </div>
    {{#if editing }}
        <todo-item-edit label="{{ label || '' }}" on-save="finishEditing" on-cancel="finishEditing" />
    {{/if}}
</li>