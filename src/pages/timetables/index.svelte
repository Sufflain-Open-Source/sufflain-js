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
    import { fetchTimetables, fetchOrder, fetchTeacherTimetables } from '../../data/couch.js';
    import { getGroup, getName } from '../../data/local.js';
    import LinkCard from '../../components/LinkCard.svelte';
    import { url } from '@roxi/routify';
    import { onMount } from 'svelte';
    
    const name = getName();
    const group = getGroup();

    let timetables;
    let sortedTimetables;
    let postsOrder;

    onMount(async () => {
        timetables = Object.entries(typeof group == 'string' ? await fetchTimetables(group) : await fetchTeacherTimetables(name));
        postsOrder = await fetchOrder();

        sortedTimetables = sortTimetablesByTimePosted(timetables, postsOrder);
    });

    function sortTimetablesByTimePosted(timetables, postsOrder) {
        return timetables.sort((first, second) => {
            const firstTimetableOrder = getTimetableOrderByHash(first, postsOrder);
            const secondTimetableOrder = getTimetableOrderByHash(second, postsOrder);

            return firstTimetableOrder - secondTimetableOrder; 
        });
    }

    function getTimetableOrderByHash(timetable, postsOrder) {
        return postsOrder[timetable[0]];
    }
</script>

<PageMetaTitle title='Sufflain | Расписание занятий' />

{#if sortedTimetables}
    <ol>
        {#each sortedTimetables as timetable}
            <li><LinkCard title={ timetable[1].linkTitle } link={ $url(`./${ timetable[0] }`) }/></li>
        {/each}
    </ol>
{/if}
