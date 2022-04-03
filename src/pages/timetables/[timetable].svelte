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

    let timetables = getTimetables();
    const path = window.location.pathname;
    const timetableHash = path.substring(path.lastIndexOf('/')).replace('/', '');

    onMount(() => { 
        console.log(timetables)
        if (!timetables) {
            console.log('dispatching')
            dispatchEvent(requestTimetablesEvent); 
        }
    });

    function setTimetablesToFetched() {
        timetables = getTimetables();
        console.log('show')
        console.log(timetableHash)
        console.log(timetables)
        console.log(timetables.find(table => table[0] == timetableHash))
        console.log(timetables.length)
        console.log(putAllGroupsLessonsTogether(timetables[0]))
        console.log(groupLessonsWithSameTime(putAllGroupsLessonsTogether(timetables[0])))
    }
</script>

<svelte:window on:timetablesloaded={ setTimetablesToFetched } />
