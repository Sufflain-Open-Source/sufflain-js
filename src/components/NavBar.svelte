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
        const state = pagesStates[pgName];
        pagesStates[pageName] = state == true ? false : true;
    }

    // isPageActive :: String -> Boolean
    function isPageActive(pgName) {
        return pageName == pgName ? true : false;
    }
</script>

<nav>
    <div class="nav-controls-container">
        <a href="/timetables" class:page-active={ pagesStates.timetablesPage } on:click={ () => invertPageActiveState('settingsPage') }>Главная</a>
        <a href="/settings" class:page-active={ pagesStates.settingsPage } on:click={ () => invertPageActiveState('timetablesPage') }>Настройки</a>
    </div>
</nav>

<style>
    .page-active {
        color: black;
    }

    .nav-controls-container {
        display: flex;
        gap: 4rem;
        justify-content: center;
        align-items: center;
        height: 100%;
    }

    nav {
        background-color: var(--dark-red);
        height: 3.6rem;
        position: fixed;
        bottom: 0;
        right: 0;
        left: 0;
    }

    nav a {
        display: inline-block;
        color: var(--light-blue);
        padding: .44rem;
        border-radius: 1.11rem;
    }

    nav a.page-active {
        color: var(--dark-red);
        background-color: var(--light-blue);
    }

    @media (min-width: 1280px) {
        nav {
            bottom: none;
            top: 0;
            justify-content: center;
        }

        .nav-controls-container {
            justify-content: flex-end;
            padding-right: 8rem;
        }
    }

    @media (min-width: 1920px) {
        nav {
            display: flex;
        }
        .nav-controls-container {
            width: 1920px;
        }
    }
</style>
