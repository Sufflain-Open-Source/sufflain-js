<!-- 
Copyright (C) 2022 Timofey Chuchkanov

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.
-->

<script>
    import { UserType } from '../shared/const.js';
    import { createEventDispatcher, onMount } from 'svelte';

    const dispatch = createEventDispatcher();
    const defaultEntityPlaceholder = '---';

    export let groups = [];
    export let names = [];
    export let currentEntityToShow = defaultEntityPlaceholder;
    export let currentUserType = UserType.student;

    $: checkedUserType = currentUserType;
    $: placeholder = currentEntityToShow;

    let entity;

    // switchPlaceholderToDefaultIfUserTypeIs :: Number -> Undefined
    function switchPlaceholderToDefaultIfUserTypeIs(type) {
        if (currentUserType == type)
            placeholder = defaultEntityPlaceholder;
        else
            placeholder = currentEntityToShow;
    }

    // dispatchUserSelect :: -> Undefined
    function dispatchUserSelect() {
        dispatch('userSelect', {
            checkedUserType,
            entity
        });
    }

    // setUserType :: Event -> Undefined
    function setUserType(event) {
        const target = event.target;
        
        if (target.checked) {
            checkedUserType = target.name == 'student' ? UserType.student : UserType.teacher;
        }
    }

    function resetEntity() { entity = ''; }

    function onRadioButtonChange(e) { setUserType(e);  resetEntity(); dispatchUserSelect(); }

    onMount(() => dispatchUserSelect());
</script>

<form on:submit|preventDefault>
    <section id="select-user-type">
        <h2>Выберите тип пользователя</h2>

        <label for="student">Студент</label>
        <input on:change={ e => { switchPlaceholderToDefaultIfUserTypeIs(UserType.teacher); onRadioButtonChange(e) } } 
               type="radio" id="student" name="student" checked={ checkedUserType == UserType.student }>

        <label for="teacher">Преподаватель</label>
        <input on:change={ e => { switchPlaceholderToDefaultIfUserTypeIs(UserType.student); onRadioButtonChange(e) } } 
               type="radio" id="teacher" name="teacher" checked={ checkedUserType == UserType.teacher }>
    </section>
    <section id="select-entity">
        {#if checkedUserType == 1}
            <h2>Выберите  группу</h2>

            <select bind:value={ entity } on:change={ dispatchUserSelect }>
                <option value="">{ placeholder }</option>
                {#each groups as group}
                    <option value={ group }>{ group }</option>
                {/each}
            </select>
        {:else}
            <h2>Выберите  преподавателя</h2>

            <select bind:value={ entity } on:change={ dispatchUserSelect }>
                <option value="">{ placeholder }</option>
                {#each names as name}
                    <option value={ name[0] }>{ name[1] }</option>
                {/each}
            </select>
        {/if}
    </section>
</form>

<style>
    select {
        background-color: var(--light-blue);
        border-style: none;
        border-radius: 1.11rem;
        padding: 20px 20px;
        box-shadow: var(--default-shadow);
        -webkit-box-shadow: var(--default-shadow);
        -moz-box-shadow: var(--default-shadow);
        color: var(--dark-red);
    }
</style>