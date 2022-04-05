<script>
    export let title;
    export let data = [];
</script>

<div class="group-table">
    {#if title}
        <p class="group-table-title">{ title }</p>
    {/if}
    <div class="group-table-data">
        {#each data as part}
            <p>{ part }</p>
        {/each}
    </div>
</div>
