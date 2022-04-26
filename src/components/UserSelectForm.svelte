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
    import { UserType } from "../shared/const.js";
    import { createEventDispatcher, onMount } from "svelte";

    const dispatch = createEventDispatcher();
    const defaultEntityPlaceholder = "---";

    export let groups = [];
    export let names = [];
    export let currentEntityToShow = defaultEntityPlaceholder;
    export let currentUserType = UserType.student;
    export let dispatchUserSelectOnMount = true;

    $: groupsSorted =
        groups && typeof groups.err == "undefined"
            ? groups.sort((l, r) => l.localeCompare(r, "ru", { numeric: true }))
            : [];
    $: checkedUserType = currentUserType;
    $: placeholder = currentEntityToShow;

    let entity;

    // switchPlaceholderToDefaultIfUserTypeIs :: Number -> Undefined
    function switchPlaceholderToDefaultIfUserTypeIs(type) {
        if (currentUserType == type) placeholder = defaultEntityPlaceholder;
        else placeholder = currentEntityToShow;
    }

    // dispatchUserSelect :: -> Undefined
    function dispatchUserSelect() {
        dispatch("userSelect", {
            checkedUserType,
            entity,
        });
    }

    // setUserType :: Event -> Undefined
    function setUserType(event) {
        const target = event.target;

        if (target.checked) {
            checkedUserType =
                target.name == "student" ? UserType.student : UserType.teacher;
        }
    }

    function resetEntity() {
        entity = "";
    }

    function onRadioButtonChange(e) {
        setUserType(e);
        resetEntity();
        dispatchUserSelect();
    }

    function onEntitySelect() {
        dispatchUserSelect();
        currentUserType = checkedUserType;
        currentEntityToShow = getCurrentEntity();
    }

    function getCurrentEntity() {
        const selected = document.querySelector("select");
        return selected.options[selected.selectedIndex].text;
    }

    onMount(() => {
        if (dispatchUserSelectOnMount) dispatchUserSelect();
    });
</script>

<div class="form-container">
    <form on:submit|preventDefault>
        <section id="select-user-type">
            <h2>Выберите тип пользователя</h2>

            <div class="user-type-selector">
                <label for="student">Студент</label>
                <input
                    on:change={(e) => {
                        switchPlaceholderToDefaultIfUserTypeIs(
                            UserType.teacher
                        );
                        onRadioButtonChange(e);
                    }}
                    type="radio"
                    id="student"
                    name="student"
                    checked={checkedUserType == UserType.student}
                />
            </div>

            <div class="user-type-selector">
                <label for="teacher">Преподаватель</label>
                <input
                    on:change={(e) => {
                        switchPlaceholderToDefaultIfUserTypeIs(
                            UserType.student
                        );
                        onRadioButtonChange(e);
                    }}
                    type="radio"
                    id="teacher"
                    name="teacher"
                    checked={checkedUserType == UserType.teacher}
                />
            </div>
        </section>
        <section id="select-entity">
            {#if checkedUserType == 1}
                <h2>Выберите группу</h2>

                <div class="select-container">
                    {#if groups.err}
                        <p class="error">{groups.err}</p>
                    {:else}
                        <select
                            required
                            bind:value={entity}
                            on:change={onEntitySelect}
                        >
                            <option value="">{placeholder}</option>
                            {#each groupsSorted as group}
                                <option value={group}>{group}</option>
                            {/each}
                        </select>

                        <p class="select-arrow">⌄</p>
                    {/if}
                </div>
            {:else}
                <h2>Выберите преподавателя</h2>

                <div class="select-container">
                    {#if names.err}
                        <p class="error">{names.err}</p>
                    {:else}
                        <select
                            required
                            bind:value={entity}
                            on:change={onEntitySelect}
                        >
                            <option value="">{placeholder}</option>
                            {#each names as name}
                                <option value={name[0]}>{name[1]}</option>
                            {/each}
                        </select>

                        <p class="select-arrow">⌄</p>
                    {/if}
                </div>
            {/if}
        </section>

        <slot />
    </form>
</div>

<style>
    label {
        margin-left: 1ch;
    }

    h2 {
        margin-bottom: 1rem;
    }

    section {
        margin-bottom: 2.22rem;
    }

    section:last-of-type {
        margin-bottom: 8.88rem;
    }

    select {
        -webkit-appearance: none;
        position: relative;
        background-color: var(--light-blue);
        border-style: none;
        border-radius: 1.11rem;
        padding: 20px 30px 20px 20px;
        box-shadow: var(--default-shadow);
        color: var(--dark-red);
    }

    .select-container {
        position: relative;
        display: inline-block;
    }

    select + p.select-arrow {
        display: inline-block;
        position: absolute;
        right: 1ch;
        top: 45%;
        transform: translateY(-50%);
    }

    select:hover {
        cursor: pointer;
    }

    div.user-type-selector {
        display: flex;
        flex-direction: row-reverse;
        margin-bottom: 1rem;
        justify-content: flex-end;
    }

    .user-type-selector *:hover {
        cursor: pointer;
    }

    form {
        margin: 2.22rem 1.11rem 0 1.11rem;
        display: flex;
        flex-direction: column;
    }

    .form-container {
        display: grid;
        place-items: center;
        padding-bottom: calc(var(--nav-bar-height) * 2);
    }

    #select-entity {
        position: relative;
    }

    @media not all and (min-resolution: 0.001dpcm) {
        select + p.select-arrow {
            transform: translateY(-60%);
        }
    }
</style>
