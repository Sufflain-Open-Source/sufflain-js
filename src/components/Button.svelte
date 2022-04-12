<script>
    export let buttonsClass;
    export let onClick;
    export let text;
</script>

<button class="{ buttonsClass } hoverable-with-gradient" on:click|preventDefault={ onClick }>{ text }</button>

<style>
    button {
        padding: 20px 10px;
        border-style: none;
        box-shadow: var(--default-shadow);
        width: 277px;
        align-self: center;
    }

    button.mainButton {
        color: var(--dark-red);
        background-color: var(--light-blue);
    }

    button.tertiaryButton {
        color: var(--light-blue);
        background-color: var(--medium-red);
    }

    button:hover {
        background: none;
        cursor: pointer;
        color: var(--light-blue);
    }
</style>
