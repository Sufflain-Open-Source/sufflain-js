<!-- 
    We use this file—a top-level _layout.svelte—as a page guard.
    It redirects to the welcome page if the id is not saved by a user.
    Otherwise, it redirects the welcome page to the timetables page.

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
    import { getGroup, getName } from '../data/local.js';
    import { redirect, route } from '@roxi/routify';

    const group = getGroup();
    const name = getName();

    // We need to clean cached page content to prevent from going back to the welcome page if
    // the user has saved the id.
    window.onpopstate = function () { 
        if (window.location.pathname == '/welcome') {
            window.location.replace('/timetables') 
        }
    };

    if ($route.shortPath == '') {
        $redirect('/welcome')
    }

    if ((!group && !name) && $route.shortPath != '/welcome') {
        $redirect('/welcome');
    }

    if (isRedirectFromWelcomePageNeeded())
        $redirect('/timetables');

    function isRedirectFromWelcomePageNeeded() {
        if (typeof group == 'string' || typeof name == 'string') {
            return $route.shortPath == '/welcome'
        } 
    }
</script>

<slot></slot>
