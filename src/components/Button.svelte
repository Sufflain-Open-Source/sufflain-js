<script>
    export let buttonsClass;
    export let onClick;
    export let text;
    export let imagePath;
    export let alt = "";
    export let isAnchor = false;
</script>

{#if isAnchor}
    <a class="{buttonsClass} hoverable-with-gradient" href={onClick}>
        {#if imagePath}
            <img {alt} src={imagePath} />
        {/if}

        {#if text}
            {text}
        {/if}
    </a>
{:else}
    <button
        class="{buttonsClass} hoverable-with-gradient"
        on:click|preventDefault={onClick}
    >
        {#if imagePath}
            <img {alt} src={imagePath} />
        {/if}

        {#if text}
            {text}
        {/if}
    </button>
{/if}

<style>
    button,
    a {
        padding: 20px 10px;
        border-style: none;
        box-shadow: var(--default-shadow);
        width: 277px;
        align-self: center;
    }

    a {
        display: block;
        padding: 0;
        margin: 0;
        padding: 20px 5px;
    }

    .floating {
        display: grid;
        place-items: center;
        gap: 1rem;
        width: 4rem;
        color: var(--dark-red);
        background-color: var(--dark-blue);
        border-radius: 1rem;
        box-shadow: 0px 1px 16px rgba(0, 0, 0, 0.3);
    }

    .mainButton {
        color: var(--dark-red);
        background-color: var(--light-blue);
    }

    button:hover,
    a:hover {
        background: none;
        cursor: pointer;
        color: var(--light-blue);
    }

    button img,
    a img {
        width: 2rem;
    }
</style>
