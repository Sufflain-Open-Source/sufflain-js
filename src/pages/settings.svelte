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
    import { clearSessionStorage } from "../data/session.js";
    import { UserType } from "../shared/const.js";
    import { fetchGroups, fetchNames } from "../data/remote.js";
    import { getGroup, getName, clearStorage } from "../data/local.js";
    import LoadingIndicator from "../components/LoadingIndicator.svelte";
    import UserSelectForm from "../components/UserSelectForm.svelte";
    import PageMetaTitle from "../components/PageMetaTitle.svelte";
    import { saveEntity } from "../util/entity_operations.js";
    import NavBar from "../components/NavBar.svelte";
    import Footer from "../components/Footer.svelte";
    import { onMount } from "svelte";

    let currentName;
    let currentGroup;

    let detail;
    let groups;
    let names;

    let currentEntityToShow;
    let inferredUserType;

    onMount(async function () {
        groups = await fetchGroups();
        names = await fetchNames();

        currentGroup = getGroup();
        currentName = getName();
        currentEntityToShow = getCurrentEntityToShow();
        inferredUserType = inferCheckedUserTypeFromEntity();
    });

    function clearStorageOnConfirm() {
        const userResponse = confirm(
            "Удаление данных требует перезапуска приложения. Продолжить?"
        );

        if (userResponse) {
            clearStorage();
            clearSessionStorage();
            window.location.reload();
        }
    }

    // inferCheckedUserTypeFromEntity :: -> Number or Undefined
    function inferCheckedUserTypeFromEntity() {
        if (currentName) return UserType.teacher;

        if (currentGroup) return UserType.student;
    }

    // getCurrentEntityToShow :: -> String or Undefined
    function getCurrentEntityToShow() {
        if (!names.err) {
            if (currentName)
                return names.find((usr) => usr[0] == currentName)[1];
        }

        if (currentGroup) return currentGroup;
    }

    // extractEventDetail :: Event -> Undefined
    function extractEventDetail(event) {
        detail = event.detail;
    }

    // saveSelectedEntity :: -> Undefined
    function saveSelectedEntity() {
        detail.entity && saveEntity(detail);
    }
</script>

<NavBar />

<PageMetaTitle title="Sufflain | Настройки" />

{#if groups || names}
    <UserSelectForm
        on:userSelect={(e) => {
            extractEventDetail(e);
            saveSelectedEntity();
        }}
        {names}
        {groups}
        currentUserType={inferredUserType}
        {currentEntityToShow}
    >
        <div class="delete-data-container">
            <p on:click={clearStorageOnConfirm} class="delete-data">
                Удалить сохраненные настройки
            </p>
            <p class="tooltip">?</p>
        </div>
    </UserSelectForm>
{:else}
    <LoadingIndicator />
{/if}

<Footer appVersion="2.0 Domestic Dante (alpha2)" />

<style>
    .tooltip:hover::after {
        content: 'Не хотите больше использовать Sufflain? Удалите ненужные данные.';
        position: absolute;
        bottom: 4ch;
        right: 0;
        width: 200px;
        background-color: var(--light-blue);
        padding: 10px 20px;
        border-radius: 1.1rem;
        box-shadow: 0px 1px 16px rgba(0, 0, 0, .3);
    }

    .tooltip:hover {
        position: relative;
        cursor: pointer;
    }

    .tooltip {
        padding: 5px 10px;
        border-radius: 1.1rem;
        box-shadow: var(--default-shadow);
        background-color: var(--light-blue);
    }

    .delete-data-container {
        display: flex;
        align-items: center;
        gap: 2rem;
    }

    .delete-data {
        text-align: center;
        text-decoration: underline;
    }
    .delete-data:hover {
        color: var(--medium-red);
        cursor: pointer;
    }
</style>
