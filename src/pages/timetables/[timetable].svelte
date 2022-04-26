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
    import { getTimetables } from "../../data/session.js";
    import { requestTimetablesEvent } from "../../events/custom-window-events.js";
    import { onMount } from "svelte";
    import {
        putAllGroupsLessonsTogether,
        groupLessonsWithSameTime,
    } from "../../util/timetables_alteration.js";
    import { getName } from "../../data/local.js";
    import GroupTable from "../../components/GroupTable.svelte";
    import NotFound from "../../components/NotFound.svelte";
    import NavBar from "../../components/NavBar.svelte";
    import LoadingIndicator from "../../components/LoadingIndicator.svelte";
    import { metatags } from "@roxi/routify";

    const path = window.location.pathname;
    const timetableHash = path
        .substring(path.lastIndexOf("/"))
        .replace("/", "");
    const name = getName();

    let timetables = getTimetables();
    let isHashPresent = isHashPresentInTimetables(timetableHash, timetables);
    let isNotFound =
        typeof isHashPresent == "boolean" ? !isHashPresent : isHashPresent;
    let selectedTimetable;
    let restructuredTimetable;

    $: title = selectedTimetable
        ? `Sufflain | ${selectedTimetable[1].linkTitle}`
        : `Sufflain | Не найдено`;

    $: {
        metatags.title = title;
    }

    onMount(() => {
        if (!timetables) dispatchEvent(requestTimetablesEvent);

        setTimetablesToFetched();
    });

    function setTimetablesToFetched() {
        if (!isNotFound) {
            selectedTimetable = timetables.find(
                (table) => table[0] == timetableHash
            );

            if (name)
                restructuredTimetable = groupLessonsWithSameTime(
                    putAllGroupsLessonsTogether(selectedTimetable)
                );

            if (!name) sortLessonsByTime(selectedTimetable[1].lessons, false);
            else sortLessonsByTime(restructuredTimetable, true);
        }
    }

    // sortLessonsByTime :: [String] Boolean -> Undefined
    // Sort timetable lessons by their time in ascending order.
    function sortLessonsByTime(lessons, isTableRestrucured) {
        (!isTableRestrucured
            ? () => lessons.sort((l, r) => l.time.localeCompare(r.time))
            : () =>
                  lessons.sort((l, r) => {
                      const lLessonsTime = l[0].time;
                      const rLessonsTime = r[0].time;

                      return lLessonsTime.localeCompare(rLessonsTime);
                  }))();
    }

    // isHashPresentInTimetables :: String [Object] -> Boolean
    function isHashPresentInTimetables(hash, tables) {
        if (tables == null || tables == undefined) return "loading";

        const foundHash = tables.find((table) => table[0] == hash);
        return foundHash ? true : false;
    }
</script>

<svelte:window on:timetablesloaded={() => window.location.reload()} />

{#if !isNotFound}
    <NavBar />

    <div class="table-container">
        {#if selectedTimetable && !restructuredTimetable}
            <h2 id="group-title">{selectedTimetable[1].title}</h2>
        {/if}

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
                        <td>{lesson[0].time}</td>
                        <td>
                            {#each lesson as groupLesson}
                                <GroupTable
                                    title={groupLesson.title}
                                    data={groupLesson.data}
                                />
                            {/each}
                        </td>
                    </tr>
                {/each}
            {/if}
            {#if selectedTimetable && !restructuredTimetable}
                {#each selectedTimetable[1].lessons as lesson}
                    <tr>
                        <td>{lesson.time}</td>
                        <td>
                            <GroupTable data={lesson.data} />
                        </td>
                    </tr>
                {/each}
            {/if}
        </table>
    </div>
{:else if isNotFound == "loading"}
    <LoadingIndicator />
{:else}
    <NotFound />
{/if}

<style>
    .table-container {
        display: grid;
        place-items: center;
        padding-top: 0.5rem;
        margin: auto 0.5rem;
    }

    table {
        min-width: 100%;
        text-align: center;
        border-collapse: collapse;
    }

    td {
        padding: 15px 30px;
    }

    tr > td:nth-child(2) {
        display: grid;
        gap: 1rem;
        place-items: center;
    }

    tr:nth-child(even) {
        background-color: rgba(132, 207, 255, 0.2);
    }

    tr:nth-child(1) {
        font-size: 1.33rem;
        background-color: var(--dark-blue);
    }

    h2#group-title {
        text-align: center;
        padding: 0.5rem 0.5rem;
        margin-bottom: 0.5rem;
        border-radius: 1.11rem;
        background-color: rgba(254, 133, 153, 0.4);
    }

    @media (min-width: 820px) {
        .table-container {
            max-width: 800px;
            margin-left: auto;
            margin-right: auto;
        }
    }
</style>
