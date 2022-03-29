<!-- 
Copyright (C) 2022 Timofey Chuchkanov

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.
-->

<script>
    import { fetchGroups, fetchNames } from '../data/couch';
    import LoadingIndicator from '../components/LoadingIndicator.svelte';
    import UserSelectForm from '../components/UserSelectForm.svelte';
    import { saveEntity } from '../util/entity_operations.js';
    import { onMount }  from 'svelte';
    import { goto } from '@roxi/routify';

    let detail;
    let groups;
    let names;

    onMount(async function() {
            groups = await fetchGroups(); 
            names = await fetchNames(); 
    });

    function extractEventDetail(event) {
        detail = event.detail;
    }

    function saveSelectedEntity() {
        detail && saveEntity(detail);
    }
</script>

{#if !groups && !names}
    <LoadingIndicator></LoadingIndicator>
{:else}
    <UserSelectForm on:userSelect={ extractEventDetail } { names } { groups }></UserSelectForm> 
    <button on:click={ () => { saveSelectedEntity(); $goto('/timetables'); } }>Продолжить</button>
{/if}
