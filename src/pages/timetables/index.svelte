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
    import PageMetaTitle from '../../components/PageMetaTitle.svelte';
    import { fetchOrder } from '../../data/remote.js';
    import { getTimetables } from '../../data/session.js';
    import LinkCard from '../../components/LinkCard.svelte';
    import { requestTimetablesEvent } from '../../events/custom-window-events.js';
    import NavBar from '../../components/NavBar.svelte';
    import { url } from '@roxi/routify';
    import { onMount } from 'svelte';
    
    let timetables;
    let postsOrder;

    onMount(() => {
        dispatchEvent(requestTimetablesEvent);
    });

    async function fetchAndSetData() {
        postsOrder = await fetchOrder();
        timetables = getTimetables();

        sortTimetablesByTimePosted(timetables, postsOrder);
        console.log('fetch and set')
    }

    // sortTimetablesByTimePosted :: [Object] Object -> Undefined
    function sortTimetablesByTimePosted(timetables, postsOrder) {
        timetables.sort((first, second) => {
            const firstTimetableOrder = getTimetableOrderByHash(first, postsOrder);
            const secondTimetableOrder = getTimetableOrderByHash(second, postsOrder);

            return firstTimetableOrder - secondTimetableOrder; 
        });
    }

    // getTimetableOrderByHash :: Object Object -> Number 
    function getTimetableOrderByHash(timetable, postsOrder) {
        return postsOrder[timetable[0]];
    }
</script>

<svelte:window on:timetablesloaded={ fetchAndSetData } />

<NavBar />
<PageMetaTitle title='Sufflain | Расписание занятий' />

{#if timetables}
    <ol>
        {#each timetables as timetable}
            <li><LinkCard title={ timetable[1].linkTitle } link={ $url(`./${ timetable[0] }`) }/></li>
        {/each}
    </ol>
{/if}
