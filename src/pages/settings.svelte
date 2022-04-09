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
    import { clearSessionStorage } from '../data/session.js';
    import { UserType } from '../shared/const.js';
    import { fetchGroups, fetchNames } from '../data/remote.js';
    import { getGroup, getName, clearStorage } from '../data/local.js';
    import LoadingIndicator from '../components/LoadingIndicator.svelte';
    import UserSelectForm from '../components/UserSelectForm.svelte';
    import PageMetaTitle from '../components/PageMetaTitle.svelte';
    import { saveEntity } from '../util/entity_operations.js';
    import NavBar from '../components/NavBar.svelte';
    import { onMount }  from 'svelte';

    let currentName;
    let currentGroup;

    let detail;
    let groups;
    let names;

    let currentEntityToShow;
    let inferredUserType;

    onMount(async function() {
        groups = await fetchGroups(); 
        names = await fetchNames(); 

        currentGroup = getGroup();
        currentName = getName();
        currentEntityToShow = getCurrentEntityToShow();
        inferredUserType = inferCheckedUserTypeFromEntity();
    });

    function clearStorageOnConfirm() {
        const userResponse = confirm('Удаление данных требует перезапуска приложения. Продолжить?');

        if (userResponse) {
            clearStorage();
            clearSessionStorage();
            window.location.reload();
        }
    }

    // inferCheckedUserTypeFromEntity :: -> Number or Undefined
    function inferCheckedUserTypeFromEntity() {
        if (currentName)
            return UserType.teacher;

        if (currentGroup)
            return UserType.student;
    }

    // getCurrentEntityToShow :: -> String or Undefined
    function getCurrentEntityToShow() {
        if (currentName)
            return names.find(usr => usr[0] == currentName)[1];

        if (currentGroup)
            return currentGroup;
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

<PageMetaTitle title='Sufflain | Настройки' />

{#if groups || names}
    <UserSelectForm on:userSelect={ (e) => { extractEventDetail(e); saveSelectedEntity(); } }
                    { names } 
                    { groups } 
                    currentUserType={ inferredUserType } 
                    currentEntityToShow={ currentEntityToShow }>
    </UserSelectForm> 
    <button on:click|preventDefault={ clearStorageOnConfirm }>Удалить сохраненные данные</button>
{:else}
    <LoadingIndicator></LoadingIndicator>
{/if}
