<script>
    export let buttonsClass;
    export let onClick;
    export let text;
    export let imagePath;
</script>

<button
    class="{buttonsClass} hoverable-with-gradient"
    on:click|preventDefault={onClick}
>
    {#if imagePath}
        <img alt="telegram logo" src={imagePath} />
    {/if}

    {#if text}
        {text}
    {/if}
</button>

<style>
    button {
        padding: 20px 10px;
        border-style: none;
        box-shadow: var(--default-shadow);
        width: 277px;
        align-self: center;
    }

    button.floating {
        display: grid;
        place-items: center;
        gap: 1rem;
        width: 4rem;
        color: var(--dark-red);
        background-color: var(--dark-blue);
        border-radius: 1rem;
        box-shadow: 0px 1px 16px rgba(0, 0, 0, .3);
    }

    button.mainButton {
        color: var(--dark-red);
        background-color: var(--light-blue);
    }

    button:hover {
        background: none;
        cursor: pointer;
        color: var(--light-blue);
    }

    button img {
        width: 2rem;
    }
</style>
