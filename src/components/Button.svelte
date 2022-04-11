<script>
    export let buttonsClass;
    export let onClick;
    export let text;
</script>

<button class={ buttonsClass } on:click|preventDefault={ onClick }>{ text }</button>

<style>
    button {
        padding: 20px 10px;
        border-radius: 1.11rem;
        border-style: none;
        box-shadow: 0px 1px 4px rgba(0, 0, 0, .3);;
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