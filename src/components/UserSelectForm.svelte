<script>
    export let groups;
    export let names;

    let checkedUserType = 1;

    function setUserType(event) {
        const target = event.currentTarget;
        
        if (target.checked) {
            checkedUserType = target.name == 'student' ? 1 : 2;
        }
    }
       
</script>

<form on:submit|preventDefault>
    <section id="select-user-type">
        <h2>Выберите тип пользователя</h2>

        <label for="student">Студент</label>
        <input on:change={ setUserType } type="radio" id="student" name="student" checked={ checkedUserType == 1 }>

        <label for="teacher">Преподаватель</label>
        <input on:change={ setUserType } type="radio" id="teacher" name="teacher" checked={ checkedUserType == 2 }>
    </section>
    <section id="select-entity">
        {#if checkedUserType == 1}
            <h2>Выберите  группу</h2>

            <select>
                {#each groups as group}
                    <option>{ group }</option>
                {/each}
            </select>
        {:else}
            <h2>Выберите  преподавателя</h2>

            <select>
                {#each names as name}
                    <option>{ name[1] }</option>
                {/each}
            </select>
        {/if}
    </section>
    <button>Продолжить</button>
</form>
