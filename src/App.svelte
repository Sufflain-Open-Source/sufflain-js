<script>
    import { fetchGroups, fetchNames, fetchTimetables } from './data/couch';
    import LoadingIndicator from './components/LoadingIndicator.svelte';
    import UserSelectForm from './components/UserSelectForm.svelte';
    import { onMount }  from 'svelte';
    import { Router } from '@roxi/routify';
    import { routes } from '../.routify/routes';

    let groups;
    let names;

    onMount(async function() {
            groups = await fetchGroups(); 
            names = await fetchNames(); 
    });
</script>

{#if !groups && !names}
    <LoadingIndicator></LoadingIndicator>
{:else}
   <UserSelectForm { names } { groups }></UserSelectForm> 
{/if}
