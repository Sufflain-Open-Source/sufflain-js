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
    import { getTimetables } from '../../data/session.js';
    import { requestTimetablesEvent } from '../../events/custom-window-events.js';
    import { onMount } from 'svelte';
    import { putAllGroupsLessonsTogether, groupLessonsWithSameTime } from '../../util/timetables_alteration.js';
    import { getName } from '../../data/local.js';
    import GroupTable from '../../components/GroupTable.svelte';
    import NotFound from '../../components/NotFound.svelte';

    const path = window.location.pathname;
    const timetableHash = path.substring(path.lastIndexOf('/')).replace('/', '');
    const name = getName();

    let isNotFound = false;

    let timetables;
    let selectedTimetable;
    let restructuredTimetable;

    onMount(() => { 
        if (!timetables) {
            dispatchEvent(requestTimetablesEvent); 
        }
    });

    function setTimetablesToFetched() {
        timetables = getTimetables();
        const isHashPresent = isHashPresentInTimetables(timetableHash, timetables)

        if (!timetables || !isHashPresent) {
            isNotFound = true;
            return;
        }

        selectedTimetable = timetables.find(table => table[0] == timetableHash);

        if (name) restructuredTimetable = groupLessonsWithSameTime(putAllGroupsLessonsTogether(selectedTimetable));

        if (!name) 
            sortLessonsByTime(selectedTimetable[1].lessons, false);
        else
            sortLessonsByTime(restructuredTimetable, true);
    }

    // sortLessonsByTime :: [String] Boolean -> Undefined
    // Sort timetable lessons by their time in ascending order.
    function sortLessonsByTime(lessons, isTableRestrucured) {
        (!isTableRestrucured ? () => lessons.sort((l, r) => l.time.localeCompare(r.time)) 
                             : () => lessons.sort((l, r) => {
                                         const lLessonsTime = l[0].time;
                                         const rLessonsTime = r[0].time;

                                         return lLessonsTime.localeCompare(rLessonsTime);
                                     }))();
    }

    // isHashPresentInTimetables :: String [Object] -> Boolean
    function isHashPresentInTimetables(hash, tables) {
        const foundHash = tables.find(table => table[0] == hash);

        return typeof foundHash == 'undefined' ? false : true;
    }
</script>

<svelte:window on:timetablesloaded={ setTimetablesToFetched } />

{#if !isNotFound}
    <table>
        <thead>
            <tr>
                <td id="time-title">Время</td>
                <td id="data-title">Информация</td>
            </tr>
        </thead>
        {#if restructuredTimetable}
            {#each restructuredTimetable as lesson}
                    <tr>
                        <td>{ lesson[0].time }</td>
                        <td>
                            {#each lesson as groupLesson}
                                <GroupTable title={ groupLesson.title } data={ groupLesson.data } />
                            {/each}
                        </td>
                    </tr>
            {/each}
      {/if}
      {#if selectedTimetable && !restructuredTimetable}
          {#each selectedTimetable[1].lessons as lesson}
                <tr>
                    <td>{ lesson.time }</td>
                    <td>
                        <GroupTable data={ lesson.data } />
                    </td>
                </tr>
            {/each}
      {/if}
    </table>
{:else}
    <NotFound />
{/if}
