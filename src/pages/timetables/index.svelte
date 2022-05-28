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
    import PageMetaTitle from "../../components/PageMetaTitle.svelte";
    import { fetchOrder } from "../../data/remote.js";
    import { getTimetables } from "../../data/session.js";
    import LinkCard from "../../components/LinkCard.svelte";
    import { requestTimetablesEvent } from "../../events/custom-window-events.js";
    import NavBar from "../../components/NavBar.svelte";
    import LoadingIndicator from "../../components/LoadingIndicator.svelte";
    import Button from "../../components/Button.svelte";
    import { url } from "@roxi/routify";
    import { onMount } from "svelte";
    import { makePageTitle } from "../../util/strings";

    const title = makePageTitle("Расписание занятий");

    let isNothingToShow = false;
    let timetables;
    let postsOrder;

    onMount(() => {
        dispatchEvent(requestTimetablesEvent);
    });

    async function fetchAndSetData() {
        postsOrder = await fetchOrder();
        timetables = getTimetables();

        sortTimetablesByTimePosted(timetables, postsOrder);

        if (timetables == [] || areAllTimetablesLessonsEmpty(timetables))
            isNothingToShow = true;
    }

    // sortTimetablesByTimePosted :: [Object] Object -> Undefined
    function sortTimetablesByTimePosted(timetables, postsOrder) {
        timetables.sort((first, second) => {
            const firstTimetableOrder = getTimetableOrderByHash(
                first,
                postsOrder
            );
            const secondTimetableOrder = getTimetableOrderByHash(
                second,
                postsOrder
            );

            return firstTimetableOrder - secondTimetableOrder;
        });
    }

    // getTimetableOrderByHash :: Object Object -> Number
    function getTimetableOrderByHash(timetable, postsOrder) {
        return postsOrder[timetable[0]];
    }

    // areAllTimetablesLessonsEmpty :: Object -> Boolean
    function areAllTimetablesLessonsEmpty(timetables) {
        return timetables.every(areTimetableLessonsEmpty);
    }

    // timetableLessonsEmpty :: Object -> Boolean
    function areTimetableLessonsEmpty(timetable) {
        let lessons = [];

        if (timetable[1].lessons) lessons = timetable[1].lessons;

        if (timetable[1].data) lessons = timetable[1].data;

        return lessons.length <= 0 ? true : false;
    }
</script>

<svelte:window on:timetablesloaded={fetchAndSetData} />

<NavBar />
<PageMetaTitle {title} />

{#if !timetables}
    <LoadingIndicator />
{:else if isNothingToShow}
    {#if Object.keys(timetables).length == 0}
        <p id="nothing-to-show">Здесь нечего показывать.</p>
    {:else if timetables[0][0] == "err"}
        <p class="error">{timetables[0][1]}</p>
    {/if}
{:else if timetables}
    <div class="cards-container">
        {#each timetables as timetable}
            {#if !areTimetableLessonsEmpty(timetable)}
                <LinkCard
                    title={timetable[1].linkTitle}
                    link={$url(`./${timetable[0]}`)}
                />
            {/if}
        {/each}
    </div>
{/if}

<div class="fab-container">
    <Button
        isAnchor="true"
        onClick={"/#donate"}
        buttonsClass="floating"
        imagePath="img/handshake-angle-solid.svg"
    />

    <Button
        isAnchor="true"
        onClick={"https://t.me/painsufflain"}
        buttonsClass="floating"
        imagePath="img/telegram.svg"
    />
</div>

<style>
    p#nothing-to-show,
    .error {
        display: inline-block;
        text-align: center;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    .fab-container {
        flex-direction: column;
        display: flex;
        gap: 1.5rem;
        position: fixed;
        bottom: 17vh;
        right: 5vw;
    }

    @media (min-width: 550px) {
        .cards-container {
            display: grid;
            justify-content: center;
        }
    }

    .cards-container {
        margin-bottom: 40vh;
    }
</style>
