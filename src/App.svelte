<script>
    import { fetchGroups, fetchNames, fetchTimetables, fetchTeachersTimetables, fetchOrder } from "./data/couch";
    import { onMount } from 'svelte';
    import { Router } from "@roxi/routify";
    import { routes } from "../.routify/routes";

    let groups;
    let names;
    let timetables;
    let teachersTimetables;
    let order;

    onMount(async function() {
            groups = await fetchGroups(); 
            names = await fetchNames(); 
            timetables = await fetchTimetables(); 
            teachersTimetables = await fetchTeachersTimetables();  
            order = await fetchOrder();
    });
</script>

{#if !groups && !names}
        Loading...
{:else}
        { JSON.stringify(groups) }
        <hr>
        { JSON.stringify(names) }
        <hr>
        { JSON.stringify(timetables) }
        <hr>
        { JSON.stringify(teachersTimetables ) }
        <hr>
        { JSON.stringify(order) }
{/if}
