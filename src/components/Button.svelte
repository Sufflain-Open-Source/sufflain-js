<script>
    export let buttonsClass;
    export let onClick;
    export let text;
</script>

<button class={ buttonsClass } on:click|preventDefault={ onClick }>{ text }</button>

<style>
    button:hover {
        cursor: pointer;
    }

    button {
        padding: 20px 10px;
        border-radius: 1.11rem;
        border-style: none;
        box-shadow: var(--default-shadow);
    }

    button.mainButton {
        color: var(--dark-red);
        background-color: var(--light-blue);
    }

    button.tertiaryButton {
        color: var(--light-blue);
        background-color: var(--medium-red);
    }
</style>