<script>
    export let title;
    export let data = [];
</script>

<div class="group-table" 
     class:with-background={ typeof title == 'undefined' ? false : true }>
    {#if title}
        <p class="group-table-title">{ title }</p>
    {/if}
    <div class="group-table-data">
        {#each data as part}
            <p>{ part }</p>
        {/each}
    </div>
</div>

<style>
    .group-table {
        width: 168.281px;
        border-radius: 1.11rem;
    }

    .with-background {
        background-color: var(--light-blue);
        box-shadow: var(--default-shadow);
    }

    .group-table p {
        padding: .55rem;
        text-align: left;
    }

    p.group-table-title {
        text-align: center;
        border-top-left-radius: 1.11rem;
        border-top-right-radius: 1.11rem;
        padding: 5px;
        background-color: var(--dark-blue);
    }

</style>
