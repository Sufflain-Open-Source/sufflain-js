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
    const path = window.location.pathname;
    const pageName = path.substring(path.lastIndexOf('/')).replace('/', '');
    
    const pagesStates = {
        timetablesPage: isPageActive('timetables'),
        settingsPage: isPageActive('settings')
    };

    // invertPageActiveState :: String -> Undefined
    function invertPageActiveState(pgName) {
        pagesStates[pgName] = !pagesStates[pgName];
    }

    // isPageActive :: String -> Boolean
    function isPageActive(pgName) {
        return pageName == pgName ? true : false;
    }
</script>

<nav>
    <a href="/timetables" class:page-active={ pagesStates.timetablesPage } on:click={ () => invertPageActiveState('timetablesPage') }>Главная</a>
    <a href="/settings" class:page-active={ pagesStates.settingsPage } on:click={ () => invertPageActiveState('settingsPage') }>Настройки</a>
</nav>

<style>
    .page-active {
        color: black;
    }
</style>
